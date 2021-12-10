import React from 'react';
import './styles/form.css'
import "./styles/account.css"
import { Logout } from './Logout';

let url = "http://localhost:3000/api/users";
let urlUpdate = "http://localhost:3000/api/users/update";
let urlDelete = "http://localhost:3000/api/users/delete";

const userOK = 'Compte édité avec succès!';
const userDelOK = 'Compte supprimé avec succès!';


function handleError(status) {

    switch (status)
    {
      case 200:
      case 201:
      console.log(userOK);
      return alert(userOK);
      case 501:
        return alert('error when trying to get cookie!');
      default:
        
          if (status >= 400 && status <= 599) {
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


class Account extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            nickname: '',
            email: '',
            password: '',
            passwordAgain: '',
            userinfo: []
      };
    }

    async componentDidMount() {
      this.setState({
        userinfo: await this.getUser()
     
      });
    }  

async formAccountPutData(FormObject) {

  await fetch(urlUpdate, {
    method: 'PUT',
    credentials: 'include',
    headers: { 
      'Content-Type': 'application/console' },
    body: JSON.stringify(FormObject)

  }).then(response => {
    console.log(FormObject);
    handleError(response.status);
    return;
  }).catch(errors => {
  console.log('BackEnd error:', errors);
  return;
});
}


async getUser() {

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
    var nicknameV = this.state.nickname;
    var emailV = this.state.email;
  
    e.preventDefault();

    let FormObject = { 
      nickname: nicknameV, 
      email: emailV };

      console.log('form', FormObject);
    this.formAccountPutData(FormObject);
      
  }
    
  
  deleteSubmit = (e) => {

    if (window.confirm("Etes vous sur de vouloir supprimer votre compte? Cette action est irreversible.")) {

        e.preventDefault();

      fetch(urlDelete, {
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
                value={this.state.nickname}
                placeholder={userinfo.nickname}
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
                value={this.state.email}
                placeholder= {userinfo.email}
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