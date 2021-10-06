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


exports.signup = (req, res, next) => {

    //check if password is strong enough
  if (!schema.validate(req.body.password)) {
    throw new error("Error! Password must be stronger. It must have at least one uppercase, one digit, one special character");
  }

  //crypt password 
  bcrypt.hash(req.body.password, 10)
  .then(hash =>{
      const user = new User({
          email: req.body.email,
          password: hash
      });
      user.save()
      .then(() => res.status(201).json({message: 'User created!'}))
      .catch(error => res.status(400).json({error: 'Couldn\'t create user'}));
  })
  .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
  
  User.findOne({ email: req.body.email })
  .then(user => {
      if (!user) {
          return res.Status(401).json( { error: 'User not found'});
      }
      bcrypt.compare(req.body.password, user.password)
      .then(valid => {
          if (!valid) {
              return res.Status(401).json( { error: 'Incorrect password.'});
          }
          res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                secret,
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

exports.getUserAccount = (req, res, next) => {
  
  User.findOne({ where: { id: req.params.id }})
      .then((user) => res.status(200).json(user))
      .catch(error => res.status(404).json({ error }));
};