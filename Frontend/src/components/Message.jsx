import React from "react";
import "./styles/message.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { Image } from "../components";
import { externIMGUrl} from "./Image";

let url = "http://localhost:3000/api/posts";
let urlUser = "http://localhost:3000/api/users/@me";

class Message extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            user: [],
            message: [],
            newPost: '',
            textEdit: '',
            disable: true,
            msgID: 0,
    }
  }

    updatePost(e) {

      this.setState({
        newPost: e.target.value,
      });
    }

    editPost(e) {

      this.setState({
        textEdit: e.target.value,
      });
    }

  async componentDidMount() {
    this.setState({
      user: await this.getUser(),
      message: await this.getMessages()
    });
  }

 handleMSGError(status) {

    switch (status)
    {
      case 200:
      case 201:
        window.location.reload(); //refresh window after a post
      break;
      default:
          if (status >= 400 && status <= 599) {
            return alert('Unexpected error, please try again later.');
          }
      break;  
    }
}

sendPostIMG()
{ 
  var msg = this.state.newPost;

  var data = new FormData();
  data.append("message", msg);
  data.append("image", externIMGUrl); //make sure the string "image" here match the one used in multer middleware.


  fetch(url, {
    method: 'POST',
    headers: { 'Accept': 'application/json'
    },
    credentials: 'include',
    body: data


  }).then(response => {

    this.handleMSGError(response.status);
  }).catch(errors => {

  console.log('BackEnd error:', errors);
});
}


handlePostNewMSG = (e) => {

  e.preventDefault();
  this.sendPostIMG();
}

async getMessages() {

    try {
   const answer = await fetch(url, {
      method: 'GET',  
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      }
    })

      if (answer.ok)
      {
        return answer.json();
      }
     else {
         return "NULL";
      
    }
  } catch (error)
  {
    return "NULL";
  }
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
    if (answer.ok)
    {
      return answer.json();
    }
   else {
       return "NULL";    
  }
} catch (error)
{
  return "NULL";
}
}

createNewPost() {
  
  const { user } = this.state;

  return (

    <div className="newPostWrapper">
        <div className="newpostTop">     
        <div className="postTopLeft">
          
        <img className="postProfileImg" alt="avatar"
              src={ user.avatar }>
                </img>
            <div className="postUsername">
        </div>

        </div>
        </div>
        
        <form onSubmit={ this.handlePostNewMSG }>
        <textarea
            className="formTextArea"
                required
                value={this.state.newPost}
                placeholder="Quoi de neuf?"
                minLength="4"
                onChange={this.updatePost.bind(this)}
                >
                  </textarea>
                <br/>

<div id="newPostBottom">
    <Image />
<button type="submit" id="btnNewPost">
            Poster
          </button>
          </div>
    </form>
       </div>
  )
}

async editMessage(FormObject) {

  const { msgID } = this.state;
  let postEditURL = url + "/" + msgID;

    return fetch(postEditURL , {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(FormObject)
    
      }).then(response => {
        const result = this.handleMSGError(response.status);        
        return result;
      }).catch(errors => {
      console.log('BackEnd error:', errors);
      return false;
    });
}

handleSubmitEditMSG = (e) => {
     
  e.preventDefault();

  const { textEdit } = this.state;

  let obj =
  {
    "message": textEdit
  };

  this.editMessage(obj);   
}

deleteMessage = (id) => {

  let fullURL = url + "/" + id;

  if (window.confirm("Etes vous sur de vouloir supprimer ce message? Cette action est irreversible.")) {

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

displayEditDeleteButton(user, message)
{

  let pseudoA = user.nickname;
  let pseudoB = message.user.nickname
  const idd = message.id;

  if (pseudoA === pseudoB || user.admin === true)
  {
    return (
    
    <div className="postButtonsGroup">
    <button type="submit" id="postEditButton" onClick= {() => { this.handleClickEdit(idd)} }>
          Editer
        </button>

        <button type="submit" id="postDeleteButton" onClick= {() => { this.deleteMessage(idd) } }>
          Supprimer
        </button>
        </div>
    )
  } 
}

handleLikeError(status) {

  if (status >= 400 && status <= 599) {
    return alert('Unexpected error, please try again later.');
  }
  else {
    window.location.reload();
  }
}

handleClickLike = (e, id) => {

  e.preventDefault();

  let urlLike = "/" + id + "/like";
  let fullURLLike = url + urlLike;

  fetch(fullURLLike, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
     },
    credentials: 'include',

  }).then(response => {

    this.handleLikeError(response.status);

  }).catch(errors => {

  console.log('BackEnd error:', errors);
});
}

isUserLike(msgObj, user)
{
  if (msgObj) { 

    if (msgObj.userId === user.id) {
       return true;
    }
  }

  return false;
}

displayLikeButton(user, message, id)
{

      const msgObj = message.like['0'];

          return (

            <div id="postBtm">

              <div class={ this.isUserLike(msgObj, user) ? "likedCom" : "likeCom" } onClick={(e) => { this.handleClickLike(e, id); }}>

                <FontAwesomeIcon icon={faThumbsUp} > </FontAwesomeIcon> 
                <div class="likeText"> J'aime</div>
                </div>

            <a class="likeCom" href={ "/message/?id=" + id }>
        
          <FontAwesomeIcon icon={faComment} > </FontAwesomeIcon> 
          <div class="likeText">Commenter</div>
          </a>
          </div>
          )
}
  


displayUpdatePostButtondMSG(message)
{
  const idd = message.id;
  const { msgID } = this.state;
  const { disable } = this.state;

  if (!disable && msgID === idd) {
    return (
    
    <div className="postButtonsGroup">
    <button type="submit" id="btnNewPost" onClick= { this.handleSubmitEditMSG  }>
          Mettre à jour 
        </button>
        </div>
    )
  } 
}

handleClickEdit(idd) {

  this.setState({disable:!this.state.disable})
  this.setState({msgID:idd}) 
}

displayMessages(message, id) {

  const { disable } = this.state;
  const { msgID } = this.state;

  if (disable || msgID !== id) {

    return (
      <div className="post">
  <a href={ "/message/?id=" + message.id }>
 
  { message.message } 

  <img class="imagePost" alt="" src={message.imageUrl }></img>  
 </a>
   </div>
    )
  } 
  
  else {

    return(

  <textarea className="post" onChange={this.editPost.bind(this)}>
 
    { message.message }         
 </textarea>
    )
  }
}

displayMessagesContainer() {

    const { user } = this.state;
    const { message } = this.state;

    if (message === "NULL")
    {
      return (
      <div>
          Pas de messages. Soyez le premier à poster!
      </div>
      )
    }

    return (   

    <article id ="messageBlock">

   { message.map((message) => (
   
     <div className="postWrapper">
   <ol key = { message.id } >

<div className="postTop">  
      <div className="postTopLeft"> 
      
              <img className="postProfileImg" alt="avatar"
              src={ message.user.avatar }>
                </img>
                <div className="postUsername">
            { message.user.nickname }
            </div>        
            </div> 

            { this.displayEditDeleteButton(user, message) }

            </div>

            { this.displayMessages(message, message.id) }
            { this.displayUpdatePostButtondMSG(message) }
            { this.displayLikeButton(user, message, message.id)}
        </ol>

        </div>
    )) }  
 
    </article>
    ) 
}

  render() {
  
    return (
      <article className="postContainer">
          { this.createNewPost() }
          { this.displayMessagesContainer() }
        </article>

    )    
}
}


  
export default Message;