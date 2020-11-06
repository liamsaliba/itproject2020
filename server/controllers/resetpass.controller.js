const User = require("../models/user.model");
const emailBot = require("../emailbot/email");

const resetPasswordStep1 = async (req, res) => {
  try {
    const username = req.body.username;

    var useremail = await User.findByUsername(username);
    if (!useremail) { 
      throw Error("Username not found.");
    }

    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 6; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    User.saveCode(username, OTP)
    emailBot.sendResetPassword(
      useremail,
      OTP
    )

    
  } catch (err) { 
      res.status(400).json(err);
  }
};


const resetPasswordStep2 = async (req, res) => {
  try {
    const username = req.body.username;
    const code = req.body.code;
    const password = req.body.password;

    const user = await User.verifyCode(username, code);
    
    user.local.password = password ;
    user.code.otp = null;
    user.code.timecreation = null;

    await user.save();
    res.status(200).send(user.toObject());
  } catch (err) { 
    res.status(400).json("Invalid verification code or not entering code within time limit 120s");
}
};

module.exports = {
  resetPasswordStep1,
  resetPasswordStep2
};
