import React from "react";
import "./styles/message.css"

let url = "http://localhost:3000/api/posts";
let urlUser = "http://localhost:3000/api/users/@me";

class Message extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            message: [],
            newPost: '' 
      }
    }

    updatePost(e) {

      this.setState({
        newPost: e.target.value,
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
        window.location.reload();
      break;
      default:
          if (status >= 400 && status <= 599) {
            return alert('Unexpected error, please try again later.');
          }
      break;  
    }
  }

async postMessage(FormObject) {

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

handlePostNewMSG = (e) => {

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
    

<button type="submit" id="btnNewPost">
            Poster
          </button>
</form>

       </div>

  )
}

displayEditDeleteButton(pseudoA, pseudoB)
{
  if (pseudoA === pseudoB)
  {

    return (
    
    <div className="postButtonsGroup">
    <button type="submit" id="postEditButton">
          Editer
        </button>

        <button type="submit" id="postDeleteButton">
          Supprimer
        </button>
        </div>
    )
  } 
}


displayMessages() {

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

   {  message.map((message) => (
   
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

            { this.displayEditDeleteButton(user.nickname, message.user.nickname) }

  
            </div>

            <a className="post"  href={ "/message/?id=" + message.id }>
             { message.message }         
            </a>
      
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
            { this.displayMessages() }
  

        </article>

    )
  
    
}
}
  
export default Message;