require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())


app.post('/login', (req, res)=>{
//authenticate user
let jwtSecretKey = process.env.JWT_SECRET_KEY;
let data = {
    time : Date(),
    userId:1,
}

const token = jwt.sign(data, jwtSecretKey);1
console.log(token);

res.send(token);

})

app.get("/auth", (req, res, next) => {
    // Tokens are generally passed in the header of the request
    // Due to security reasons.
  
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = req.header(tokenHeaderKey);
  
        const verified = jwt.verify(token, jwtSecretKey);
        console.log(verified)
         if(verified){
            return res.send("Successfully Verified");
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
    next()
});

app.listen(3000)