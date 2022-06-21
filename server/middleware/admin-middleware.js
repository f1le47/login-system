const userModel = require("../models/user-model")

module.exports = async (req, res, next) => {
  try {
    const {refreshToken} = req.cookies

    const user = await userModel.findOne({refreshToken})

    const userRole = user.role

    let isAdmin = false

    if (userRole == 'Admin') {
      isAdmin = true
    }

    if (!isAdmin) {
      return next(ApiError.NoAdminRoot())
    }

    next()
  } catch(e) {

  }
}