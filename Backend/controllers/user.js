const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
var passwordValidator = require('password-validator');

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

exports.createUser = (req, res) => {

  if (!req.body.nickname || !req.body.name || !req.body.email || !req.body.password) {
    res.status(400).send({message: "Content cannot be empty!"});
    return;
  }

  User.findOne({ where : {email: req.body.email }}) 
  .then(user => {

    if (user) {
      return res.status(409).send({ error: "User already exist in the DB" });
    }
  })
   

  bcrypt.hash(req.body.password, 10)
  .then(hash =>{
    const user = { 
      name: req.body.name,
      nickname: req.body.nickname,
      email: req.body.email,
      password: hash,
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

exports.login = (req, res) => {

  User.findOne({ where : {email: req.body.email }}) 
  .then(user => {

    if (!user) {
      return res.status(404).send({ error: "User not found!" });
    }
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {

          if (!valid) {
              return res.Status(406).json( { error: 'Incorrect password.'});
          }
          res.status(200).json({ 
              userId: user.id,
              token: jwt.sign({ userId: user.id }, secret, { expiresIn: '24h' }),
              message: 'Sucessfully Connected'

            });
            console.log("Sucessfully Connected!");
            return;
          })
          .catch(error => res.status(406).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};


exports.getUserAccount = (req, res) => {
  
  const id = req.params.id;

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
        message: "Error retrieving User with id=" + id
      });
    });
};

exports.getAllUsers = (req, res) => {

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

exports.updateUser = (req, res) => {
  try {

    const id = req.params.id;
    User.update( req.body, { where: { userId: id } }); 
    return res.status(200).json({ message: "Successfully updated user!" });
    
  } catch (error) {
    return res.status(500).send({ error: "Error, couldn't update user!" });
  }
};

exports.deleteUser = (req, res) => {

  try {
    const id = req.params.id;
    User.destroy({ where: { userId: id } }); 
    return res.status(200).json({ message: "Successfully deleted user!" });
    
  } catch (error) {
    return res.status(500).send({ error: "Error, couldn't delete user!" });
  }
};

