var jwt = require("jsonwebtoken");
const Secret_Word = "SinghJi";
const fetchUser = (req, res, next)=>{
    // taking input from headers
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"Plese verify with correct details"})
    }
    try {
        // Getting id from jwt token
        const data = jwt.verify(token, Secret_Word);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Plese verify with correct details"})
    }
}
module.exports = fetchUser;