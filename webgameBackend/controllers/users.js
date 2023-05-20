const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, categories, active } = request.body

  const user = new User({
    username,
    categories,
    active
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const { username } = request.body

  if (username) {
    const user = await User.findOne({ username })
    if (user) {
      response.json(user)
    } else {
      response.status(404).json({ error: 'User not found' })
    }
  } else {
    const users = await User.find({})
    response.json(users)
  }
})

usersRouter.put('/:id', async (request, response) => {
  const { score, category, status } = request.body
  const userId = request.params.id

  const categoryToUpdate = `categories.${category}.score`

  try {
    const user = await User.findById(userId)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    const oldScore = user.categories[category].score

    if (score > oldScore) {
      const update = {
        $set: {
          [categoryToUpdate]: score,
          active: status
        }
      }

      const options = { new: true }

      const updatedUser = await User.findByIdAndUpdate(userId, update, options)

      response.json(updatedUser)
    } else {
      const update = {
        $set: {
          active: status
        }
      }

      const options = { new: true }

      const updatedUser = await User.findByIdAndUpdate(userId, update, options)
      console.log(updatedUser)
      response.json(updatedUser)
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' })
  }
})




module.exports = usersRouter