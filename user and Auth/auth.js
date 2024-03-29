const JWT = require('jsonwebtoken');
const { User } = require("./model/user.js");

exports.auths = async (req, res) => {

  const token = req.header('Authorization');
  if (!token) {
    return req;
  }
  // console.log('>>>',token)

  const details = JWT.decode(token, process.env.JWTPasscode);
  // console.log('>>>', details.id);
  
  const user = await User.findById(details.id)
  // console.log(user)

  if (user) {
    return user;
  }
  return req;
}