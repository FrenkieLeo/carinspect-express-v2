const jwt = require('jsonwebtoken')
const signkey = 'frenkieLeo'

const verify = function(token){
    return async(resolve, reject) => {
        jwt.verify(token, signkey ,(error, decoded) => {
            if (error) {
              console.log(error.message)
              return false
            }
            console.log(decoded)
            return true
          });
    }

}

module.exports = {
    verify
}