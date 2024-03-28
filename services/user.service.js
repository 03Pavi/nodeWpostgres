const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const loginService = async (payload) => {
  const { password, email } = payload;
  const alreadyExist = await User.findOne({ where: { email } });
  if (alreadyExist) {
    const checkPass=await bcrypt.compare(password,alreadyExist.password)
    if (!checkPass) {
      return {
        status: 400,
        message: "Password is incorrect",
        data: null,
      };
    } else {
      return {
        status: 200,
        message: "user Login Successfully",
        data: alreadyExist,
      };
    }
  }
  else{
    return {
      status: 400,
      message: "user not found",
      data: null,
    };
  }
};
const registerService = async (payload) => {
  const { password, email, lastName, firstName } = payload;
  const alreadyExist = await User.findOne({ where: { email } });
  if (alreadyExist) {
    return {
      status: 400,
      message: "user Already Exist",
      data: null,
    };
  }
  const hashedPass = await bcrypt.hash(password, 10);
  const response = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPass,
  });
  return {
    status: 200,
    message: "user Register Successfully",
    data: response,
  };
};

module.exports = { registerService, loginService };
