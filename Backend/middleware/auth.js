const jwt = require('jsonwebtoken');
let secret = process.env.JWT_SECRET;


module.exports = (req, res, next) => {
  try {

    let cookie = req.cookies['user_token'];
    if (cookie) {

      next();
      return;
  }

    return res.status(500).send({ error: "Error, couldn't get user! (not logged)" });
    
  }
  catch (error) {

    return res.status(500).send({ error: "Error, couldn't get user!" });
  }

};