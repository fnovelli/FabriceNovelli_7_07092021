import React from "react";
import "./styles/message.css"


let url = 'http://localhost:3000/api/auth/posts';
let urlUser = 'http://localhost:3000/api/auth';


class Message extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            message: [],
            comment: [],
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
      alert('msg envoyé!');
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

    e.preventDefault();

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(msg)
  
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

  console.log('user =', user);

  return (
    <article className="postContainer">

    <div className="newPostWrapper">
        <div className="postTop">
          
        <div className="postTopLeft">
          
          <img className="postProfileImg" alt="avatar"
          src={ user.avatar }>
            </img>
            <div className="postUsername">

        </div>

        </div>
        </div>
        
        <form onSubmit={ this.handlePostNewMSG }>
         <input type="textarea"
            className="form-control"
                required
                value={this.state.newPost}
                placeholder="Quoi de neuf?"
                minLength="4"
                onChange={this.updatePost.bind(this)}
                ></input>
                <br/>
    

<button type="submit" id="btnNewPost">
            Poster
          </button>
</form>

       </div>
         
</article>
  )
}

displayMessages() {

    const { message } = this.state;

    if (message.length === 0)
    {
      return (
      <div>
          Pas de messages. Soyez le premier à poster!
      </div>
      )
    }

    return (

      
      <div>
          
          { console.log(message.length) }

   {  message.map((message) => (
     

   <ol key = { message.id } >
    
    <article className="postContainer">

        <div className="postWrapper">
            <div className="postTop">
              
            <div className="postTopLeft">
              
              <img className="postProfileImg" alt="avatar"
              src={ message.user.avatar }>
                </img>
                <div className="postUsername">
            { message.user.nickname }
            </div>

            </div>
            </div>
                 
            <div className="post">
             { message.message }
           
            </div>
            </div>
              
    </article>
        </ol>
    )) }  
    
    </div>

    )
      
}

  render() {

    
    return (
        <div id="messageBlock">
          { this.createNewPost() }
            { this.displayMessages() }
  

        </div>

    )
  
    
}
}
  
export default Message;