const jwt = require('jsonwebtoken');
const {responseHelper} = require('../helper')

SECRET = process.env.SECRET
const Auth ={
    verifyToken(req, res, next){
        const token = req.body.token
        console.log(token);
        if (token){
            const verified = jwt.verify(token,SECRET)
            req.data=verified;
            if (verified){
                console.log("Verified")
                return next();
            }
            else{
                return res.status(responseHelper.status.error).json(error.message);
            }
        } else {
            res.status(responseHelper.status.error).send({message: 'Youre not authenticated, please login first'})
            console.log('Youre not authenticated');
        }
    }
}
module.exports = Auth;