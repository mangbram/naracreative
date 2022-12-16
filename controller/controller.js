const express = require("express");
const { databaseQuery, databaseConfig } = require("../database");
const { responseHelper } = require("../helper");
const jwt = require("jsonwebtoken");
const Auth = require("../middleware/auth");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { service } = require("../services");
SECRET = process.env.SECRET;

//* register user begin //
const registerUser = async (req, res) => {
  const { username, email, password} = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await service.addUser(username, email, hashedPass, 'GUEST');
    if (user instanceof Error) {
      throw new Error(user);
    }
    console.log(hashedPass);
    res.status(responseHelper.status.success).json(user);
  } catch (err) {
    res.status(responseHelper.status.error).json(err.message);
  }
};
//* register user end //

//* login user begin //
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await service.login(email);
    console.log(user);
    const userData = user;
    if (userData.length === 0) {
      res
        .status(responseHelper.status.error)
        .json({ message: "User not found" });
    } else {
      bcrypt.compare(password, userData[0].password, (err, result) => {
        if (err) {
          res.status(responseHelper.status.error).json(err.message);
        } else if (result === true) {
          const token = jwt.sign(
            {
              userid: userData[0].userid,
              username: userData[0].username,
              email: userData[0].email,
              password: userData[0].password,
            },
            process.env.SECRET
          );
          res.cookie("tokenJWT", token, { httpOnly: true, sameSite: "strict" });
          res.status(responseHelper.status.success).json({
            message: "User logged id",
            userid: userData[0].userid,
            username: userData[0].username,
            email: userData[0].email,
            token: token,
          });
        } else {
          if (result != false) {
            res.status.send("Wrong password");
          }
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(responseHelper.status.error).json({ message: "Database error" });
  }
};
//*  login user end //

//*daftar ukm begin//
const daftarUkm = async(req,res)=>{
  const {userid, ukmid, prodiid, fakultasid} = req.body;
  try{
    const ukm = await service.addukm(userid, ukmid, prodiid, fakultasid);
    if (ukm instanceof Error){
      throw new Error(ukm);
    }
    console.log(ukm);
    res.status(responseHelper.status.success).json(userid, ukmid, prodiid, fakultasid);
  } catch(err){
    res.status(responseHelper.status.error).json(err.message);
  }
}
//*daftar ukm end*//

//*logout start *//
const logout = async(req, res, next)=>{
  try{
    res.clearCookie("tokenJWT").send("Cookie cleared")
  } catch(err){
    res.status(responseHelper.status.error).json(err.message);
  }
}
//*logout end*//

//*verify start*//
const verify = async(req, res, next)=>{
  try{
    const email=req.data.email;
    const userData = await service
  } catch (err){
    console.log(err.message);
    res.status(responseHelper.status.error).json(err.message);
  }
}
//*verify end*//


module.exports = { registerUser, login, daftarUkm, logout };

