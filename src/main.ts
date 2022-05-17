import * as express from 'express'
import { json } from 'body-parser'
import * as cors from 'cors'
import setupRouter from './router'

const app = express()

const PORT = 5050

app.use(cors('*'))
app.use(json())

app.use((req: express.Request, res, next) => {
  console.log('Logging: ', req.originalUrl)
  next()
})
app.use(setupRouter)

app.listen(PORT, () => {
  console.log('Listening to port ', PORT)
})