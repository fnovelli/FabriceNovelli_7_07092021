const jwt = require('jsonwebtoken');
let secret = process.env.JWT_SECRET;

function getUserId(req) {
  const token = req.headers.authorization.split(" ")[1]; 
  const decodedToken = jwt.verify(token, "secret");
  const userId = decodedToken.sub;
  return userId; 
}

module.exports.getUserId = getUserId;

module.exports = (req, res, next) => {
  try {
  
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.userId;
    
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } 
    else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};