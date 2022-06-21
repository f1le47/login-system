const { Router } = require('express');
const postController = require('../controllers/post-controller');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const postRouter = Router()

postRouter.post('/post', [authMiddleware, adminMiddleware], postController.makePost)
postRouter.get('/posts', postController.getPosts)
postRouter.delete('/post/:postId', [authMiddleware, adminMiddleware], postController.deletePost)
postRouter.put('/post', [authMiddleware, adminMiddleware], postController.changePost)

module.exports = postRouter