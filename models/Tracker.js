const mongoose = require('mongoose')

const CompleteSchema = new mongoose.Schema({
  completedDivs: {
    type: [String],
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Todo', CompleteSchema)
