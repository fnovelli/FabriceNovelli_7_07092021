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
    { console.log(message) }


    return (

      <div>

   {  message.map((message) => (

   <ol key = { message.id } >

    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
            <div className="postTopLeft">
            #{ message.id } posté par: { message.nickname }
   
            
            </div>
            </div>
                 
            <div>
             { message.message }
            </div>
            </div>
              
    </div>
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

