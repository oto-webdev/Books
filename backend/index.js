import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import expressAsyncHandler from 'express-async-handler'
import { connectDB } from './config/connectDb.js'
import bookRoutes from './routes/bookRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use("/api/books", bookRoutes)
app.use("/api/users", userRoutes)

const startServer = expressAsyncHandler(async () => {
    await connectDB()
    app.listen(port, () => {
        console.log(`Server started on port ${port}`)
    })
})

startServer()