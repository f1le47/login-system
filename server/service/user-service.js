const bcrypt = require('bcrypt')
const uuid = require('uuid')
const UserModel = require('../models/user-model')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const config = require('config')
const ApiError = require('../exceptions/api-error')

class UserService {
  async registration(email, password, rlRole) {
    const candidate = await UserModel.findOne({ email })

    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с email ${email} уже существует`)
    }
    
    const hashedPassword = await bcrypt.hash(password, 5)

    const activationLink = uuid.v4()

    const user = await UserModel.create({email, password: hashedPassword, activationLink, role: rlRole})

    await mailService.sendActivationLink(email, `${config.get('apiUrl')}/api/activate/${activationLink}`)

    const userDto = new UserDto(user) 
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink })
    if (!user) {
      throw ApiError.BadRequest('Недействительная ссылка активации')
    }

    user.isActivated = true

    await user.save()
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким e-mail не найден')
    }

    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest('Некорректный пароль')
    }

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }

    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }

    const user = await UserModel.findById(userData.id)

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }

  async getAllUsers() {
    const users = await UserModel.find()

    const usersDto = []

    users.map(user => usersDto.push(new UserDto(user)))

    return usersDto
  }

  async me(refreshToken) {
    const userData = tokenService.validateRefreshToken(refreshToken)
    return userData
  }
}

module.exports = new UserService()