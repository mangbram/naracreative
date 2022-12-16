const e = require("express");
const { param, body } = require("express-validator");
const { validator } = require("./validator");

const addUser = [
  body("username").isLength({ min: 4 }),
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  validator
]
const login =[
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  validator
]

const daftarUkm=[
  validator
]

module.exports = { addUser, login, daftarUkm };
