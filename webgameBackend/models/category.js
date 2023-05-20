const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  category: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  active: Boolean
})

mongoose.set('strictQuery', true)
categorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
