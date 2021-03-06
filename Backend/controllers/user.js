const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var passwordValidator = require('password-validator');
const db = require('../Models/Index');
const token = require("../middleware/token");
const fs = require('fs'); //allow to edit or remove files
const ava = `/images/default.png`;
const User = db.users;

//limit inject attack and force user to have strong password.
var schema = new passwordValidator();
let secret = process.env.JWT_SECRET;

schema
.is().min(8)                                    
.is().max(30)                                 
.has().uppercase(1)                              
.has().lowercase()                              
.has().digits(1)
.has().symbols(1)                                 
.has().not().spaces();

exports.createUser = async (req, res) => {

  //if the form was sent incomplete, reject the request.
  if (!req.body.nickname || !req.body.name || !req.body.email || !req.body.password) {
    res.status(400).send({message: "Content cannot be empty!"});
    return;
  }

    //we check if the nickname or the e-mail requested by the user doesn't exist in the DB already
    isMailOrNickname_In_DB(req, res);
   
    //create an user object and hash the password 
  bcrypt.hash(req.body.password, 10)
  .then(hash =>{
    const user = { 
      name: req.body.name,
      nickname: req.body.nickname,
      email: req.body.email,
      password: hash,
      avatar: `${req.protocol}://${req.get('host')}` + ava, //assign a default avatar
  };

    User.create(user)
    .then(user => {    
      res.status(201).json({
          nickname: user.nickname,
          token: jwt.sign({ userId: user.id }, secret, { expiresIn: '24h' })
      });
  })
  .catch(error => res.status(400).json({ error }));
})
.catch(error => res.status(500).json({ error }));      
};

exports.login = async (req, res) => {

  User.findOne({ where : {email: req.body.email }}) 
  .then(user => {

    if (!user) { //if the user doesn't exist, reject the request
      return res.status(404).send({ error: "User not found!" });
    }

    //we check if the password sent match the crypted one in the DB
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {

          if (!valid) {
              return res.Status(406).json( { error: 'Incorrect password.'});
          }

            const tokenJ = jwt.sign({ userId: user.id, admin: user.admin  }, secret, { expiresIn: '24h' });
    
            //send cookie to browser, "httpOnly" so the browser cannot read it, "strict" so only our client can use the cookie.
            res.cookie('user_token', tokenJ, { httpOnly: true, sameSite: 'strict' });
            res.status(200).json({ 
            userId: user.id,
            token: tokenJ,
            message: 'Sucessfully Connected'
          });

          })
          .catch(error => res.status(406).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

function logoutUser(req, res) {

  cookie = req.cookies;

  //we check the cookie and remove it to log out the user
  for (var prop in cookie) {
      if (!cookie.hasOwnProperty(prop)) {
          continue;
      }    
      res.cookie(prop, '', {expires: new Date(0)});
        
      res.status(200).json({ message: "User logout!"});
      return true;
  }

  return false;

}

exports.logout = async (req, res) => {

  if (logoutUser(req, res)) {

      return res.redirect('/');
  }
  
  res.status(200).json({ message: "No user connected."});
  return res.redirect('/');
};


async function getLoggedUser(req, res) {

  try {

    let cookie = req.cookies['user_token'];
    if (cookie) {

      const id = token.getUserId(cookie);
  
      if (id === null)
      {
        return res.status(400).json({ error: 'unexpected error, cannot get user token' });
      }

      const user = await User.findOne({
        where: { id: id },
      })
      return res.status(200).send(user);   
  }

    return res.status(500).send({ error: "Error, couldn't get user! (not logged)" });
    
  }
  catch (error) {

    return res.status(500).send({ error: "Error, couldn't get user!" });
  }
}


exports.getUser = async (req, res) => {

  const id = req.params.id;

  if (id === "@me") {
    return getLoggedUser(req, res);
  }

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    });
}

exports.getAllUsers = async (req, res) => {

  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
  User.findAll( { where: condition}).
  then((data) => {
    res.send(data);
  })
.catch((error) => {
    console.log(error);
});
};


function isMailOrNickname_In_DB(req, res)
{
  User.findOne({ where : {nickname: req.body.nickname }}) 
  .then(user => {

    if (user.nickname !== req.body.nickname ) {

      return res.status(409).send({ error: "Nickname already exist in the DB" });
    }
  })

       
  User.findOne({ where : {email: req.body.email }}) 
  .then(userMail => {

    if (userMail.email !== req.body.email ) {
      return res.status(409).send({ error: "Email already exist in the DB" });
    }
  })
}

exports.updateUser = async (req, res) => {

  try {
  
    let cookie = await req.cookies['user_token'];

    if (cookie) {
      const id = token.getUserId(cookie);

      if (id === null)
      {
        return res.status(400).json({ error: 'unexpected error, cannot get user ID' });
      }

      isMailOrNickname_In_DB(req, res);
        
      if (req.file) 
      { 

        await User.findOne({ where : {id: id }}) 
        .then(user => {
      
          //if user already had a profile pic, delete it first.
          if (user.avatar !== null) {

            if (user.avatar !== `${req.protocol}://${req.get('host')}` + ava) {

                console.log('Trying delete picture...')
                  const filename = user.avatar.split("/images")[1];

                  fs.unlink(`images/${filename}`, (err) => {
                    if (err)  {
                      console.log('Error cannot delete img: ', err);
                    }
                    else {
                      console.log(`Deleted file: images/${filename}`);
                    }
                  });
            }
          }
        })
      }

  //create an object with user information
      const userUp = { 
        nickname: req.body.nickname,
        email: req.body.email,
        bio: req.body.bio,
        avatar: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "null" 
    };

    if (userUp.avatar === "null") //don't update profile pic if user didn't request it
    {
      delete userUp.avatar;
    }

    //apply the edit
      await User.update( userUp, { where: { id: id } });  
      return res.status(200).json({ 
        userUp,
        message: 'Successfully updated user!'
    });
    }
 
    return res.status(501).send({ error: "Error, couldn't get the ID to update user." });
 
} 
  catch (error) {
    return res.status(500).send({ error: "Error, couldn't update user!" });
  }
};

exports.updateUserAdmin = async (req, res) => {

  try {
  
    let cookie = req.cookies['user_token'];

    if (cookie) {
      const id = await token.getUserId(cookie);

      if (id === null)
      {
        return res.status(400).json({ error: 'unexpected error, cannot get user ID' });
      }

      const userAdmin = await User.findOne({ where : {id: id }});

      if (userAdmin.admin === false)
      {
        return res.status(408).json({ error: 'Error, you do not have the privilege to do that.' });
      }

     const user = User.findOne({ where : {id: req.params.id }});

     if (user === null)
     {
      return res.status(408).json({ error: 'Error, cannot find user!' });
     }

      isMailOrNickname_In_DB(req, res);
        
      if (req.file) 
      { 
          //if user already had a profile pic, delete it first.
          if (user.avatar !== null) {

            console.log('Trying delete picture...')
              const filename = user.avatar.split("/images")[1];

              fs.unlink(`images/${filename}`, (err) => {
                if (err)  {
                  console.log('Error cannot delete img: ', err);
                }
                else {
                  console.log(`Deleted file: images/${filename}`);
                }
              });
        }
      }

  //create an object with user information
      const userUp = { 
        nickname: req.body.nickname,
        email: req.body.email,
        bio: req.body.bio,
        avatar: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "null" 
    };

    if (userUp.avatar === "null") //don't update profile pic if user didn't request it
    {
      delete userUp.avatar;
    }

    //apply the edit
      await User.update( userUp, { where: { id: user.id } });  
      return res.status(200).json({ 
        userUp,
        message: 'Successfully updated user!'
    });
    }
 
    return res.status(501).send({ error: "Error, couldn't get the ID to update user." });
 
} 
  catch (error) {
    return res.status(500).send({ error: "Error, couldn't update user!" });
  }
};

exports.deleteUser = async(req, res) => {

  try {

    let cookie = req.cookies['user_token'];
    if (cookie) {

      const id = await token.getUserId(cookie);
  
      if (id === null)
      {
        return res.status(500).send({ error: "Error, couldn't delete user! Cannot get ID." });
      }
      
      logoutUser(req, res);
      await User.destroy({ where: { id: id } }); 
      return res.status(200).json({ message: "Successfully deleted user!" });
    }
    
  } catch (error) {
    return res.status(500).send({ error: "Error, couldn't delete user!" });
  }
};

