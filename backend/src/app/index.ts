import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { router as issueRouter } from './routes/issueRoutes.js'
import { errorHandler } from './middlewares/errorHandler.js'

const startServer = async () => {
  try {
    const app = express()

    app.use(cors({
      origin: 'http://localhost:5173'
    }))
    app.use(bodyParser.json())
    app.use('/v1/issues', issueRouter)
    app.use(errorHandler)

    const port = process.env.PORT || 3000
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (err) {
    console.error('Error starting server', err)
  }
}

startServer()
