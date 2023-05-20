const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  categories: {
    men: { score: Number },
    women: { score: Number },
    all: { score: Number }
  },
  active: Boolean
})

mongoose.set('strictQuery', true)
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
