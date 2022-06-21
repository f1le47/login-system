const ApiError = require("../exceptions/api-error")
const postModel = require("../models/post-model")

class PostService {
  async makePost(title, content) {
    const post = await postModel.create({ title, content })
    return post
  }
  async getPosts() {
    const posts = await postModel.find()
    return posts
  }
  async deletePost(postId) {
    const post = await postModel.findByIdAndRemove(postId)
    return post
  }
  async changePost(postId, title, content) {
    const changedPost = await postModel.findByIdAndUpdate(postId, { title, content })
    return changedPost
  }
}

module.exports = new PostService()