const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    return response.json(blog.toJSON())
  } else {
    return response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  // if no title => 400
  if (!blog.title) {
    return response.status(400).send({ error: 'the title is mandatory' })
  }

  // if no url => 400
  if (!blog.url) {
    return response.status(400).send({ error: 'the url is mandatory' })
  }

  // default the likes to 0 if not present
  blog.likes = blog.likes ? blog.likes : 0
  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    await blog.remove()
    return response.status(204).end()
  } else {
    return response.status(404).end()
  }
  // await Blog.findByIdAndRemove(request.params.id)
})

module.exports = blogsRouter
