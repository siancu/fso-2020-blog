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

  let max = 0
  let maxIndex = 0
  blogs.forEach((blog, index) => {
    if (blog.likes > max) {
      max = blog.likes
      maxIndex = index
    }
  })

  const maxBlog = blogs[maxIndex]
  return {
    title: maxBlog.title,
    author: maxBlog.author,
    likes: maxBlog.likes
  }
}

module.exports = {
  // dummy,
  totalLikes,
  favoriteBlog
}
