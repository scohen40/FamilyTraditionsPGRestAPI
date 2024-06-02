const jwt = require('jsonwebtoken');

exports.generate = function(userData){
        return jwt.sign(userData, process.env.JWT_SECRET,{expiresIn:'30m'}) 
}

exports.verify = function(token){
    return new Promise((resolve, reject)=>{
        jwt.verify(token, process.env.JWT_SECRET, function(err, data){
          if(err) reject(err)
          resolve(data)  
        })
    })
}


// TODO: put up JWT protection - ask ChatGPT for steps to protect the API 
//https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html
//https://jwt.io/
//https://book.hacktricks.xyz/pentesting-web/hacking-jwt-json-web-tokens
//download jwt tool and see if your jwt can be decoded by any automatic tool