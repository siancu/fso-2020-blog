const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const apiHelper = require('./notes_api_test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

const baseUrl = '/api/blogs'

beforeEach(async () => {
  await Blog.deleteMany()

  for (const blog of apiHelper.blogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('get /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get(baseUrl)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get(baseUrl)
    expect(response.body).toHaveLength(apiHelper.blogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get(baseUrl)
    const titles = response.body.map(r => r.title)

    expect(titles).toContain('First class tests')
  })

  test('a blog has a property named id', async () => {
    const response = await api.get(baseUrl)
    const firstBlog = response.body[0]
    expect(firstBlog.id).toBeDefined()
  })
})

describe('post /api/blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'From Static Sites To End User JAMstack Apps With FaunaDB',
      author: 'Bryan Robinson',
      url: 'https://www.smashingmagazine.com/2020/06/static-sites-jamstack-apps-faunadb/',
      likes: 2
    }

    await api
      .post(baseUrl)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await apiHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(apiHelper.blogs.length + 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain('From Static Sites To End User JAMstack Apps With FaunaDB')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
