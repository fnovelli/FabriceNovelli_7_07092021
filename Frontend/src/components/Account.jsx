import React from 'react';
import './styles/form.css'
import "./styles/account.css"
import PasswordChecklist from "react-password-checklist"

let url = "http://localhost:3000/api/auth/";

const userOK = 'Compte édité avec succès!';

  
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

  
function formAccountSendData(FormObject) {
  
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(FormObject)
  
    }).then(response => {
      handleError(response.status);
    }).catch(errors => {
    console.log('BackEnd error:', errors);
    this.setState({ errors });
  });
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
            user: [],
            name: '',
            nickname: '',
            email: '',
            password: '',
            passwordAgain: '',
      };
    }


async componentDidMount() {
  await this.getFormData()
}

async getFormData() {

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
        this.setState({ 
          user: await answer.json(),
        });

      }
     else {

         return "NULL";

      
    }
  } catch (error)
  {
    return "NULL";
  }
  
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
      const FormObject = { name, nickname, email, password};

      if (isPasswordValid(password, passwordAgain)) {
        formAccountSendData(FormObject);
      }
  }
    



EditAccount() {
    
      return (
  
        <section id="formBlock">
        <h1>Paramètres du compte.</h1>

        <div class="formClass">
         <label for="nickname">Prénom</label>
         
        </div>

  
         <form onSubmit={this.handleSubmit}>
      
  
        <div class="formClass">
         <label for="nickname">Pseudo</label>c
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
  
          <div class="formClass">
          <label>Mot de Passe:</label>
              <input name="password" type="password" required pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"  onChange={this.updatePassword.bind(this)} />
              <label>Entrez le mot de passe à nouveau:</label>
              <input name="password_repeat" type="password" required pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"  onChange={this.updatePasswordAgain.bind(this)} />
  
              <PasswordChecklist
                  rules={["minLength","specialChar","number","capital","match"]}
                  minLength={8}
                  value={this.state.password}
                  valueAgain={this.state.passwordAgain}
         
          messages={{
                      minLength: "Le mot de passe doit contenir au moins 8 caractères.",
                      specialChar: "La mot de passe doit contenir au moins un caractère spécial.",
                      number: "Le mot de passe doit contenir au moins un nombre.",
                      capital: "Le mot de passe doit avoir au moins une majuscule.",
                      match: "Les deux mots de passe doivent être identique.",
                  }}
          
              />
          </div>
  
  
            <button type="submit" id="btnSignUp">
              Mettre à jour
            </button>
      
            </form>
        
        </section>
  
    
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