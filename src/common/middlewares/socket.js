const models = require('../../db/models')
const {
  User,
  Message,
  Chat,
  Merchant
} = models
const {addMerchant} = require('../helpers/addChatPerson')

module.exports = (io) => {
  io.on("connection", function(socket) {
    console.log("socket connected");
    socket.on("getMerchants", () =>  {
      Merchant.findAll({}, (error, merchants) => {
        io.emit("getAllMerchants", merchants)
      })

      socket.on('startUniqueChaat', ({receiverEmail, senderEmail, receiverId}, callback) => {
        addMerchant({receiverEmail, senderEmail, receiverId}, socket)
      })

      socket.on("JoinTwoUsers", ({roomID}, cb) => {
        socket.join(roomID)
        cb({roomID})
      })

      socket.on('sendToUser', (data) => {
        socket.broadcast.to(data.roomID).emit('dispatchMsg', {...data})
        const {
          roomID, 
          senderEmail,
          receiverEmail,
          composedMsg: {text, time},
        } = data

        const newMessage = Message.create({
          roomID,
          senderEmail,
          receiverEmail,
          text
        })


      })

    })
  })
} 