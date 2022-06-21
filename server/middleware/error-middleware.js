const ApiError = require('../exceptions/api-error')

module.exports = (err, req, res, next) => {
  console.log(err)
  if (err instanceof ApiError) {
    console.log(err.status)
    return res.status(err.status).json({message: err.message, errors: err.errors})
  }

  return res.status(500).json({message: 'Произошла непредвиденная ошибка'})
}