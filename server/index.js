const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const config = require('config')
const mongoose = require('mongoose')
const authRouter = require('./routers/authRouter')
const errorMiddleware = require('./middleware/error-middleware')
const postRouter = require('./routers/postRouter')

const PORT = config.get('port') || 5000

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: config.get('clientUrl')
}))
app.use('/api', authRouter)
app.use('/api', postRouter)
app.use(errorMiddleware)

const start = async () => {
  try {
    await mongoose.connect(config.get('dbUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()