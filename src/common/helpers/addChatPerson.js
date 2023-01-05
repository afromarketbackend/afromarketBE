const models = require('../../db/models')
const {
  User,
  Merchant,
  Chat
} = models

const addMerchant = ({receiverEmail, senderEmail, receiverId}, socket) => {
  if(!receiverEmail || !senderEmail){
    return {error: "Users are required"}
  }
  const merchant = {receiverEmail, senderEmail}

  const chats = Chat.findAll({
    where:{
      receiverEmail,
      senderEmail
    }
  })
  const reverseChats = Chat.findAll({
    where:{
      senderEmail: receiverEmail,
      receiverEmail: senderEmail
    }
  })
  if(chats.length > 0){
    socket.emit("openChat", {...chats[0]})
  } else if(reverseChats.length > 0) {
    socket.emit("openChat", {...reverseChats[0]})
  } else {
    const newChat = Chat.create({
      senderEmail,
      receiverEmail
    })
    socket.emit('openChat', newChat)
  }
}

module.exports = {addMerchant} 