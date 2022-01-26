import React from "react";
import "./styles/message.css"
import { Error } from '../components';

let url = "http://localhost:3000/api/posts";
let urlUser = "http://localhost:3000/api/users/@me";
let urlCom = "http://localhost:3000/api/comments";

class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      message: [],
      newComment: '',
      comEdit: '',
      disable: true,
      comID: 0,
    }
  }

  updateComment(e) {

    this.setState({
      newComment: e.target.value,
    });
  }

  editComment(e) {

    this.setState({
     comEdit: e.target.value,
    });
  }

  async componentDidMount() {
    this.setState({
      user: await this.getUser(),
      message: await this.getMessage(),

    });
  }

  handleCommentStatus(status) {

    switch (status) {
      case 200:
      case 201:
        window.location.reload();
        break;
      default:
        if (status >= 400 && status <= 599) {
          return alert('Unexpected error, please try again later.');
        }
        break;
    }
  }

  handleNewComment = (e) => {

    var com = this.state.newComment;
    var postID = this.state.message.id;
    let objJS = { postId: postID, comment: com };

    e.preventDefault();
    console.log('allo: ', objJS);

    fetch(urlCom, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(objJS)

    }).then(response => {

      this.handleCommentStatus(response.status);
    }).catch(errors => {

      console.log('BackEnd error:', errors);
    });
  }

  async getUser() {

    try {
      const answer = await fetch(urlUser, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      })

      if (answer.ok) {
        return answer.json();
      }
      else {
        return "NULL";

      }
    } catch (error) {
      return "NULL";
    }

  }

  createNewComment() {
    const { user } = this.state;

    return (

      <div className="newPostWrapper">
        <div className="newpostTop">

          <div className="postTopLeft">
            <img className="postProfileImg" alt="avatar"
              src={user.avatar}>
            </img>
            <div className="postUsername">

            </div>
          </div>
        </div>

        <form onSubmit={this.handleNewComment}>
          <textarea
            className="formTextArea"
            required
            value={this.state.newComment}
            placeholder="Répondre..."
            minLength="4"
            onChange={this.updateComment.bind(this)}
          >
          </textarea>
          <br />


          <button type="submit" id="btnNewPost">
            Répondre
          </button>
        </form>

      </div>
    )
  }

  displayUpdateComButtondMSG(com)
{
  const idd = com.id;
  const { comID } = this.state;
  const { disable } = this.state;

  if (!disable && comID === idd) {
    return (
    
    <div className="postButtonsGroup">
    <button type="submit" id="btnNewPost" onClick= { this.handleSubmitEditCOM  }>
          Mettre à jour 
        </button>
        </div>
    )
  } 
}

  displayComments(comment, id) {

    const { disable } = this.state;
    const { comID } = this.state;

    if (disable || comID !== id) {
  
      return (
  
        <div className="post">
        { comment.comment }

        </div>
      )
    } 
    
    else {
  

      return(
  
    <textarea className="post" onChange={this.editComment.bind(this)}>
   
      { comment.comment }         
   </textarea>
      )
    }
  }

  displayCommentsContainer() {


    const j = this.state.message;
    const { user } = this.state;

    console.log('j: ', j);

    const obj = j['user'];
    const obj2 = j['com'];

    
    
    if (!obj || !obj2) {
      return (
        <div>
          <Error />
        </div>
      )
    }

    return (
      <article id="messageBlock">

        {obj2.map((comment) => (

          <div className="postWrapper">
    
        <ol key={comment.id} >

              <div className="postTop">
                <div className="postTopLeft">
                  <img className="postProfileImg" alt="avatar"
                    src= {comment.user.avatar }>
                  </img>
                  <div className="postUsername">
                  {comment.user.nickname }           
              </div>
              </div>

              { this.displayEditDeleteButton(user, comment) }
              </div>
              
              { this.displayComments(comment, comment.id) }
              { this.displayUpdateComButtondMSG(comment) }
       

              </ol>
        </div>
    )) }  
      </article>

    )
  }

  async editCom(FormObject) {

    const { comID } = this.state;
    let postEditURL = urlCom + "/" + comID;
  
      return fetch(postEditURL , {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(FormObject)
      
        }).then(response => {
          const result = this.handleCommentStatus(response.status);        
          return result;
        }).catch(errors => {
        console.log('BackEnd error:', errors);
        return false;
      });
  }
  
  handleSubmitEditCOM = (e) => {
       
    e.preventDefault();
  
    const { comEdit } = this.state;
  
    let obj =
    {
      "comment": comEdit
    };
  
    console.log('form', obj);
    this.editCom(obj);   
  }
  

  deleteCom = (id) => {

    let fullURL = urlCom + "/" + id;
  
    if (window.confirm("Etes vous sur de vouloir supprimer ce commentaire? Cette action est irreversible.")) {
  
      fetch(fullURL, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      
        }).then(response => {
          if (response.ok) {
            window.location.reload(); //force refresh
          }
        }).catch(errors => {
        console.log('BackEnd error:', errors);
        return;
      });
    }
  }

  handleClickEdit(idd) {

    this.setState({disable:!this.state.disable})
    this.setState({comID:idd}) 
  }
  
  displayEditDeleteButton(user, message)
{

  let pseudoA = user.nickname;
  let pseudoB = message.user.nickname
  const idd = message.id;

  if (pseudoA === pseudoB || user.admin === true)
  {
    return (
    
    <div className="postButtonsGroup">
    <button type="submit" id="postEditButton" onClick= {() => { this.handleClickEdit(idd) } }>
          Editer
        </button>

        <button type="submit" id="postDeleteButton" onClick= {() => { this.deleteCom(idd) } }>
          Supprimer
        </button>
        </div>
    )
  } 
}


  async getMessage() {

    try {

      const urlID = new URL(window.location.href).searchParams.get('id');

      if (urlID === null) {
        return "NULL";
      }
      const newURL = url + "/" + urlID;
      console.log('url is ' + newURL);
      const answer = await fetch(newURL, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      })

      if (answer.ok) {
        return answer.json();
      }
      else {
        return "NULL";

      }
    } catch (error) {
      return "NULL";
    }
  }


  render() {

    const { message } = this.state;
    const j = this.state.message;
    const obj = j['user'];

    if (message === "NULL" || !obj) {
      return (
        <div>
          <Error />
        </div>
      )
    }

    return (

<article id ="messageBlock">
<div className="postWrapper">

  <div> 

    <div className="postTop">
         <div className="comTopLeft">
             
           <img className="postProfileImg" alt="avatar"
           src= { obj['avatar']}>
             </img>
             <div className="postUsername">
         {  obj['nickname']  }
            
         </div>
         </div>
         </div>
         <div className="post">
        
         { j["message"]  }  
     
      </div>
        </div>
      
</div>

    { this.createNewComment() }
    { this.displayCommentsContainer() }

    </article>
    )

}
}

export default Comment;