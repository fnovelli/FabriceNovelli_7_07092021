const JWT = require("jsonwebtoken");
let secret = process.env.JWT_SECRET;

function getUserId(req) {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = JWT.verify(token, secret); 
  const userId = decodedToken.userId;
  return userId; 
}


module.exports.getUserId = getUserId;