import React from 'react';
import './styles/form.css'
import "./styles/account.css"
import { Image } from "../components";
import { externIMGUrl } from "./Image";

let url = "http://localhost:3000/api/users/edit";
let urlUser = "http://localhost:3000/api/users/@me";

const userDelOK = 'Compte supprimé avec succès!';

function handleError(status) {

    switch (status)
    {
      case 200:
      case 201:    
      window.location.reload(); //refresh window 
      break;
      case 409:
        alert('Erreur, le mail ou le pseudo existe déjà!');
        break;
      case 501:
        alert('Erreur, impossible de charger les données du compte.');
        break;
      default:
        
          if (status >= 400 && status <= 599) {
            alert('Unexpected error, please try again later.');
          }
          break;
    }

    return false;
}

function handleErrorDel(status) {

  switch (status)
  {
    case 200:
    case 201:
    return alert(userDelOK);
    default:
        if (status >= 400 && status <= 599) {
          return alert('Unexpected error, please try again later.');
        }
    break;  
  }
}

class Account extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          nickname: "",
          email: "",
          avatar: "",
          password: "",
          passwordAgain: "",
          bio: "",
          userinfo: [],
          }
    };

    async componentDidMount() {
      this.setState({
        userinfo: await this.getUser()
     
      });
    }  


updateNickname(e) {
    
    this.setState({
      nickname: e.target.value,
    });
  }

updateEmail(e) {

    this.setState({
      email: e.target.value,
    });
  }
  
  updatePassword(e) {
  
    this.setState({
      password: e.target.value,
    });
  }

  updatePasswordAgain(e) {
  
    this.setState({
      passwordAgain: e.target.value,
    });
  }

  updateAvatar(e)
  {


    this.setState({
      avatar:e.target.value,
    })
  }

  updateBio(e) {
  
    this.setState({
      bio: e.target.value,
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

sendUserIMG()
{ 
  var nicknameR = this.state.nickname;
  var emailR = this.state.email;
  var bioR = this.state.bio;

  var data = new FormData();
  data.append("nickname", nicknameR);
  data.append("email", emailR);
  data.append("bio", bioR);
  data.append("image", externIMGUrl); //make sure the string "image" here match the one used in multer middleware.

  fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Accept': 'application/json'
    },
    body: data,

  }).then(response => {

    handleError(response.status);
  }).catch(errors => {

  console.log('BackEnd error:', errors);
});
}

   handleSubmit = (e) => {
    
    e.preventDefault();
    this.sendUserIMG();    
}
  
  deleteSubmit = (e) => {

    if (window.confirm("Etes vous sur de vouloir supprimer votre compte? Cette action est irreversible.")) {

        e.preventDefault();

      fetch(url, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      
        }).then(response => {
          handleErrorDel(response.status);  
        return;
        }).catch(errors => {
        console.log('BackEnd error:', errors);
        return;
      });
    }
  }


EditAccount() {

  const { userinfo } = this.state;

      return (

        <div>
          <article id="accountBlock">
        <section id="formBlock">
        <h1>Paramètres du compte</h1>

         <form onSubmit={this.handleSubmit}>
      
        <div className="formClass">
         <label for="nickname">Pseudo</label>
         <input type="text"
            className="form-control"
                required
                placeholder={userinfo.nickname }
                minLength="4"
                pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$"
                onChange={this.updateNickname.bind(this)}
                ></input>
        </div>
        <div className="formClass">
        <label for="email">E-mail</label>
        <input type="mail"
                  className="form-control"
                required
                placeholder={userinfo.email}

                pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}"
                onChange={this.updateEmail.bind(this)}
                ></input>
          </div>
          <div className="formClass">
          <label for="bio">bio</label>
        <textarea
                  className="formBioClass"

                placeholder={userinfo.bio}

                pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,40}"
                onChange={this.updateBio.bind(this)}>
                </textarea>
          </div>

          <div className="formClass">
        <label for="avatar">Avatar</label>
        <Image />
          </div>
  
            <button type="submit" id="btnSignUp">
              Mettre à jour
            </button>    
            </form>
            <br/>
                    
        </section>
 
            <div id="delete">
            <button type="submit" id="btnDelete" onClick= { this.deleteSubmit }>
              SUPPRIMER LE COMPTE
            </button>
            </div>
            </article>
            </div>
      );
    };

    render() {

        return (
            <div>
                { this.EditAccount() }
            </div>
        )
    }
}
    
export default Account;