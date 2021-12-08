import React from 'react';
import './styles/form.css'
import "./styles/account.css"
import PasswordChecklist from "react-password-checklist"
import { Logout } from './Logout';

let url = "http://localhost:3000/api/auth";

const userOK = 'Compte édité avec succès!';
const userDelOK = 'Compte supprimé avec succès!';


function handleError(status) {

    switch (status)
    {
      case 200:
      case 201:
      console.log(userOK);
      return alert(userOK);
      case 409:
       return alert('Username or E-mail already exist in the database.');
      default:
          if (status >= 400 && status <= 499) {
            return alert('Unexpected error, please try again later.');
          }
      break;  
    }
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


function isPasswordValid(password, passwordAgain) {
  
    if (password !== "undefined" &&  passwordAgain !== "undefined") {
        
      if (password !== passwordAgain) {
        alert("Les deux mots de passe doivent être identique.");
        return false;
      }
    } 
  
    return true;
}


class Account extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            nickname: '',
            email: '',
            password: '',
            passwordAgain: '',
      };
    }


async formAccountPutData(FormObject) {

  await fetch(url, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/console' },
    body: JSON.stringify(FormObject)

  }).then(response => {
    console.log(FormObject);
    handleError(response.status);
  }).catch(errors => {
  console.log('BackEnd error:', errors);
  this.setState({ errors });
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
  
  
   handleSubmit = (e) => {
    var name = this.state.name;
    var nickname = this.state.nickname;
    var email = this.state.email;
    var password = this.state.password;
    var passwordAgain = this.state.passwordAgain;
  
      e.preventDefault();
      const FormObject = {nickname, email };

      if (isPasswordValid(password, passwordAgain)) {
        this.formAccountPutData(FormObject);
      }
  }
    
  
  deleteSubmit = (e) => {

    if (window.confirm("Etes vous sur de vouloir supprimer votre compte? Cette action est irreversible.")) {

        e.preventDefault();

       if(Logout()) {


      fetch(url, {
        method: 'DELETE',
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
  }


EditAccount() {
    
      return (
  
        <div>
          <article id="accountBlock">
        <section id="formBlock">
        <h1>Paramètres du compte</h1>


         <form onSubmit={this.handleSubmit}>
      
  
        <div class="formClass">
         <label for="nickname">Pseudo</label>
         <input type="text"
            class="form-control"
                required
                value={this.state.nickname}
                placeholder="Peter"
                minlength="4"
                pattern="^[^&amp;<>@&quot;()'!_$*€£`+=\/;?#]+$"
                onChange={this.updateNickname.bind(this)}
                ></input>
        </div>
        <div class="formClass">
        <label for="email">E-mail</label>
        <input type="mail"
                  class="form-control"
                required
                value={this.state.email}
                placeholder="pierre@gmail.com"
                pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}"
                onChange={this.updateEmail.bind(this)}
                ></input>
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