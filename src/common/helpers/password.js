const models = require('../../db/models')
const {OneTimePassword} = models
const {jwtDecode, jwtSignOtp} = require('./token')
const {sendOTPtoMail} = require('../../modules/email-notification/email.service')

const bcrypt = require("bcryptjs");

exports.hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

exports.comparePassword = (hashedPassword, password) => {
  return bcrypt.compareSync(password, hashedPassword);
};

exports.forgotPassword = async (model, email,) =>{
  const existingModel = await model.findOne({
    where:{email}
  })
  if(!existingModel){
    return{
      error: true,
      message: 'Email not found on server',
      data: null
    }
  }
  const signedToken = jwtSignOtp(existingModel.id)
  const existingOtp = await OneTimePassword.findOne({where:{signedToken}})
  if(existingOtp){
    await OneTimePassword.destroy({where:{signedToken}})
  }
  const otp = (Math.floor(Math.random() * 899999+100000)).toString()

  await OneTimePassword.create({
    signedToken,
    otp
  })
  const mailPayload = {
    email: existingModel.email,
    mailSubject: "Password Reset Token",
    fullName: existingModel.fullName,
    otp: otp
  }
  const mail = await sendOTPtoMail(mailPayload)
  return{
    error: false,
    message: mail.message,
    data: mail.data
  }
}

exports.resetPassword = async(
  model, otp, newPassword
) => {
  const existingOtp = await OneTimePassword.findOne({where: {otp}})
  if(!existingOtp){
    return {
      error: true,
      message: "Wrong OTP inputed",
      data: null
    };
  }
  const {id} = await jwtDecode(existingOtp.signedToken)
  const existingModel = await model.findOne({ id})
  const matchingPassword = await this.comparePassword(existingModel.password, newPassword)
  if(matchingPassword){
    return{
      error: true,
      message: 'Old password cannot be the same as new one',
      data: null
    }
  }

  const password = this.hashPassword(newPassword)
  await model.update(
      {password},
      {where:{id: id}}
  )
  const updatedModel = await model.findOne({
    attributes:{exclude:['password']},
    where:{id}
  })

  await OneTimePassword.destroy({where: {otp}})
  return {model: updatedModel, email: updatedModel.email}
}