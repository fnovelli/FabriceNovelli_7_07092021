import React from "react";
import "./styles/message.css"


let url = 'http://localhost:3000/api/posts';


class Message extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: [],
            comment: [],
            user: '',
      }
    }

  async componentDidMount() {
    this.setState({
        message: await this.getMessages()
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

displayMessages() {

    const { message } = this.state;

    return (

      
      <div>
          
          { console.log(message) }

   {  message.map((message) => (
     

   <ol key = { message.id } >
    
    <article className="postContainer">

        <div className="postWrapper">
            <div className="postTop">
              
            <div className="postTopLeft">
              
              <img className="postProfileImg"
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
        <div>

            { this.displayMessages() }
  

        </div>

    )
  
    
}
}
  
export default Message;

