const _ = require('lodash')

// const dummy = (blogs) => {
//   return 1
// }



const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  const blogsLikes = blogs.map(blog => blog.likes)
  return blogsLikes.length === 0
    ? 0
    : blogsLikes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const maxBlog = _.maxBy(blogs, blog => blog.likes)
  return {
    title: maxBlog.title,
    author: maxBlog.author,
    likes: maxBlog.likes
  }
}

const mostBlogs = (blogs) => {
  const blogsByAuthors = _.groupBy(blogs, 'author')
  // blogsByAuthors is a dictionary-like object where the key is the author name
  // and the value is an array of blogs belonging to that author

  const a = _.mapValues(blogsByAuthors, (arrayOfBlogs, author) => {
    return {
      author: author,
      blogs: arrayOfBlogs.length
    }
  })
  // a is a dictionary-like object where the key is an author and the value
  // is another object with 'author' -> author_name and 'blogs' -> number_of_blogs

  const b = _.map(a, key => key)
  // b is an array of a; needed for the maxBy below

  return _.maxBy(b, 'blogs')
}

module.exports = {
  // dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
