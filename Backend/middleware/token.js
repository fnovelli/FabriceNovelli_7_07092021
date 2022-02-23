const JWT = require("jsonwebtoken");
let secret = process.env.JWT_SECRET;

function getUserId(token) {

  if (token === null)
    return null;

  const decodedToken = JWT.verify(token, secret); 
  const userId = decodedToken.userId;
  return userId; 
}

module.exports.getUserId = getUserId;