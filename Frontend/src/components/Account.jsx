import React from 'react';
import './styles/form.css'
import "./styles/account.css"
import { Image } from "../components";
import { externIMGUrl, resetImageObj} from "./Image";

let url = "http://localhost:3000/api/users/edit";
let urlUser = "http://localhost:3000/api/users/@me";

const userOK = 'Compte édité avec succès!';
const userDelOK = 'Compte supprimé avec succès!';

function handleError(status) {

    switch (status)
    {
      case 200:
      case 201:
      console.log(userOK);
      alert(userOK);
      
      return true;
      case 501:
        alert('error when trying to get cookie!');
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
    console.log(userDelOK);
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
          name: "",
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


updateName(e) {
  
    this.setState({
      name: e.target.value,
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

  
async formAccountPutData(FormObject) {

  return fetch(url , {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(FormObject)
  
    }).then(response => {
      const result = handleError(response.status);        
      return result;
    }).catch(errors => {
    console.log('BackEnd error:', errors);
    return false;
  });
}

formAccountPutDataAvatar(data) {

  fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: data


  }).then(response => {

      console.log('data: ', data);
    handleError(response.status);
  }).catch(errors => {

  console.log('BackEnd error:', errors);
});
}



   handleSubmit = (e) => {
    
    e.preventDefault();

    var nickname = this.state.nickname;
    var email = this.state.email;
    var bio = this.state.bio;
  
    if (externIMGUrl == null)
    {
      let obj =
      {
        "username": this.state.nickname,
        "email": this.state.email,
        "bio": this.state.bio,
        "avatar": externIMGUrl,
      };
      console.log('form', obj);
      this.formAccountPutData(obj);
      return;
  }
  else {

    var data = new FormData();
    data.append("nickname", nickname);
    data.append("email", email);
    data.append("bio", bio);
    data.append("avatar", externIMGUrl);  //make sure the string "image" here match the one used in multer middleware.


    this.formAccountPutDataAvatar(data);
    return;
  }
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

  console.log('cur user: ', userinfo);
  console.log("imgLink: ", externIMGUrl);

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