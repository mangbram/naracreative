const { databaseQuery } = require("../database");

const addUser = async (username, email, password) => {
  try {
    const query = "INSERT INTO users VALUES(DEFAULT, $1,$2,$3)";
    const result = await databaseQuery(query, [username, email, password]);
    if (!result) {
      throw new Error("Error adding user");
    }
    return {
      message: "User added successfully",
    };
  } catch (err) {
    return err;
  }
};

const login = async (email) => {
  try {
    const query = `SELECT * FROM users WHERE email=$1`;
    const result = await databaseQuery(query, [email]);
    if (!result) {
      throw new Error("Error username didn't match");
    }
    return result.rows;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  addUser,
  login,
};
