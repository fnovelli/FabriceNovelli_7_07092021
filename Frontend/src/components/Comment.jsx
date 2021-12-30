import React from "react";
import "./styles/message.css"
import { Error } from '../components';


let url = "http://localhost:3000/api/posts";
let urlUser = "http://localhost:3000/api/users/@me";
let urlCom = "http://localhost:3000/api/posts/comments";

class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: [],
      message: [],
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
      message: await this.getMessage()

    });
  }

  handleCommentStatus(status) {

    switch (status) {
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

  displayComments() {

    const { message } = this.state;

    return (

      <article id="messageBlock">
        {message.com.map((comment) => (
          <div className="postWrapper">

            <ol key={comment.id} >

              <div className="postTop">
                <div className="postTopLeft">
                  <img className="postProfileImg" alt="avatar"
                    src={comment.user.avatar}>
                  </img>
                  <div className="postUsername">
                    {comment.user.nickname}
                  </div>

                </div>
              </div>

              <div className="post">
                {comment.comment}

              </div>

            </ol>
          </div>
        ))}

      </article>

    )
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

  displayMessage() {

    const { message } = this.state;
    console.log('comment message iD ', message);

    if (message === "NULL") {
      return (
        <div>
          <Error />
        </div>
      )
    }

    return (

      <article id="messageBlock">

        <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">

                <div className="postUsername">
        
                </div>
              </div>
            </div>
            <div className="post">
              {message.message}
            </div>

          </div>
      </article>

    )
  }


  render() {

    return (
      <article className="postContainer">

        {this.displayMessage()}
        {this.createNewComment()}

      </article>

    )
  }

}

export default Comment;