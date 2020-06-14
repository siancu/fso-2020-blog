const listHelper = require('../utils/list_helper')
const apiHelper = require('./notes_api_test_helper')

// test('dummy returns one', () => {
//   const blogs = []
//
//   const result = listHelper.dummy(blogs)
//   expect(result).toBe(1)
// })

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(apiHelper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(apiHelper.blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of empty list is {}', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  test('when list has only one blog equals the entry', () => {
    const result = listHelper.favoriteBlog(apiHelper.listWithOneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('of a bigger list is returned right', () => {
    const result = listHelper.favoriteBlog(apiHelper.blogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})

describe('most blogs', () => {
  test('of empty list is {}', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })

  test('when list has multiple blogs from the same author, it returns the right value', () => {
    const result = listHelper.mostBlogs(apiHelper.blogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('of empty list is {}', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })

  test('when list has multiple blogs from the same author, it returns the right value', () => {
    const result = listHelper.mostLikes(apiHelper.blogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})

