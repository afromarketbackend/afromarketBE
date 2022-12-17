const jwt = require("jsonwebtoken");
const KEYS = require("../config/keys");

exports.jwtSign = (id) => {
  return jwt.sign({ id }, KEYS.JWTSecret, {
    expiresIn: KEYS.expiresIn,
  });
};

exports.jwtSignOtp = (id) => {
  return jwt.sign({ id }, KEYS.JWTSecret, {
    expiresIn: KEYS.expiresInForOtp,
  });
};

exports.jwtVerify = (token) => {
   try {
     return jwt.verify(token, KEYS.JWTSecret);
   } catch (err) {
     console.log(err);
     return {};
   }
};

exports.jwtDecode = (token) => {
	try {
    return jwt.decode(token);
  } catch (err) {
    console.log(err);
    return {};
  }
}


exports.jwtSignOut = (token) => {
 const id =  jwt.verify(token, KEYS.JWTSecret);

  

};
