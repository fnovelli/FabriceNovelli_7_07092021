import React from "react";
import "./styles/message.css"
import { Error} from '../components';


let url = "http://localhost:3000/api/posts";
let urlUser = "http://localhost:3000/api/users/@me";


class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            message: '',
            comment: [],
            newComment: ''
       
      }
    }

    updateComment(e) {

      this.setState({
        newComment: e.target.value,
      });
    }

  async componentDidMount() {
    this.setState({
      user: await this.getUser(),
      message: await this.getMessageID()
   
    });
  }


 handleCommentStatus(status) {

    switch (status)
    {
      case 200:
      case 201:
      alert('comment envoyé!');
      break;
      default:
          if (status >= 400 && status <= 599) {
            return alert('Unexpected error, please try again later.');
          }
      break;  
    }
}


async postComment(FormObject) {

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(FormObject)

  }).then(response => {

    this.handleMSGError(response.status);
    return;
  }).catch(errors => {

  console.log('BackEnd error:', errors);
  return;
});

}

handleNewComment = (e) => {

    var msg = this.state.newPost;
    let objJS = { message: msg};

    e.preventDefault();

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
       },
      credentials: 'include',
      body: JSON.stringify(objJS)
  
    }).then(response => {
  
      this.handleMSGError(response.status);
    }).catch(errors => {
  
    console.log('BackEnd error:', errors);
  });
}

async getComments() {

  try {

    const urlID = new URL(window.location.href).searchParams.get('id');
    const newURL = url + "/" + urlID;

 const answer = await fetch(newURL, {
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

createNewComment() {
  
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
    

<button type="submit" id="btnNewPost">
            Poster
          </button>
</form>

       </div>

  )
}

displayComments() {

    const { comment } = this.state;

    return (   

    <article id ="messageBlock">

   {  comment.map((comment) => (
     
     <div className="postWrapper">
     
   <ol key = { comment.id } >
  
            <div className="postTop">
              
            <div className="postTopLeft">
              
           
              <img className="postProfileImg" alt="avatar"
              src={ comment.user.avatar }>
                </img>
                <div className="postUsername">
            { comment.user.nickname }
          
       
            </div>
         

            </div>
            </div>
                 
            <div className="post">
             { comment.comment }
           
            </div>
      
        </ol>
        </div>
    )) }  
 
    </article>

    )
     
}


async getMessageID() {

  try {

    const urlID = new URL(window.location.href).searchParams.get('id');

    if (urlID === null)
    {
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

displayMessageID() {

  const { message } = this.state;
  console.log('comment message iD ', message);


  
  if (message === "NULL")
  {
    return (
      <div>

    <Error />
    </div>
    ) 
    
  }

  return (  
   <div className="postWrapper">

   { message.message }
 
    </div>
  )
  }



render() {

    
  return (
    <article className="postContainer">

        { this.displayMessageID() }

      </article>

  )  
}

}
  
export default Comment;