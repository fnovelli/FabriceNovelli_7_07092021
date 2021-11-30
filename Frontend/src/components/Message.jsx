import React from "react";


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

   message.map((message) => (
        <ol key = { message.id } >
            message: { message.message }
            id: { message.id }
        </ol>
    ))  
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

