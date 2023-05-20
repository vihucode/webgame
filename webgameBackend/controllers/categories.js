const categoriesRouter = require('express').Router()
const Category = require('../models/category')

categoriesRouter.post('/', async (request, response) => {
  const { category, active } = request.body

  if (!category) {
    return response.status(400).json({ error: 'Category is required' })
  }

  const newCategory = new Category({ category, active })
  const savedCategory = await newCategory.save()

  response.status(201).json(savedCategory)
})


categoriesRouter.get('/', async (request, response) => {
  const { categoryName } = request.body

  if (categoryName) {
    const category = await Category.findOne({ categoryName })
    if (category) {
      response.json(category)
    } else {
      response.status(404).json({ error: 'Category not found' })
    }
  } else {
    const categories = await Category.find({})
    response.json(categories)
  }
})

categoriesRouter.put('/:id', async (request, response) => {
  const { active } = request.body

  const updatedCategory = await Category.findByIdAndUpdate(request.params.id, { active: active }, { new: true })
  if (updatedCategory) {
    response.json(updatedCategory)
  } else {
    response.status(404).json({ error: 'category not found' })
  }
})

module.exports = categoriesRouter