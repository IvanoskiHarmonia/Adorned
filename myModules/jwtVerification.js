const jwt = require('jsonwebtoken');


exports.verifyToken = (userToken, jwtSecret, res) => {
    const token = userToken[0] + " something";

  if(token){
    try {
        const verfiyToken = jwt.verify(token, jwtSecret);

        res.status(201).json({
          status: 'success',
          data: verfiyToken
        });
    } catch (error) {
        res.status(401).json({
          status: 'fail',
          message: 'Invalid token'
        });
    }
    
  } else {
    res.status(401).json({
      status: 'fail',
      message: 'Token not found'
    });
  }
}

exports.createToken = (username, jwtSecret, jwtExpiresIn, res) => {
    const token = jwt.sign({ username: username }, jwtSecret, { expiresIn: jwtExpiresIn, });
      res.status(201).json({
        status: 'success',
        token,
        data: {
          user: username
        }
      }); // end of res.status(200).json
  return token;
}

// Path: ./myModules/jwtVerification.js
