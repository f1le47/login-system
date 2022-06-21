const postService = require("../service/post-service")

class PostController {
  async makePost(req, res, next) {
    try {
      const { title, content } = req.body

      await postService.makePost(title, content)

      const posts = await postService.getPosts()

      return res.json(posts)
    } catch (e) {
      next(e)
    }
  }
  async getPosts(req, res, next) {
    try {

      const posts = await postService.getPosts()

      return res.json(posts)
    } catch (e) {
      next(e)
    }
  }
  async deletePost(req, res, next) {
    try {
      const { postId } = req.params

      const isSuccess = await postService.deletePost(postId)

      if (!!isSuccess) {
        const posts = await postService.getPosts()

        res.json(posts)
      }
       
    } catch(e) {
      next(e)
    }
  }
  async changePost(req, res, next) {
    try {
      const { postId, title, content } = req.body
      
      await postService.changePost(postId, title, content)

      const posts = await postService.getPosts()

      res.json(posts)
    } catch(e) {
      next(e)
    }
  }
}

module.exports = new PostController()