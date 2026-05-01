import express from 'express'
import cors from 'cors'
import jobRoutes from './routes/job.route'
import { errorMiddleware } from './middleware/error.middleware'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/jobs', jobRoutes)

app.use(errorMiddleware)

export default app