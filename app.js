require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()


const port = process.env.PORT || 8080

const helmet = require('helmet')
const cors = require('cors')
const exp = require('express-rate-limit')
const xss = require('xss-clean')
const fileupload = require('express-fileupload')

//middlewares
const errorMiddleware = require('./middleware/errorhandler')


//DB
const connectDB = require('./DB/db')
const routes = require('./routes/router') // routes

app.use(errorMiddleware)
app.use(express.json())
app.use(fileupload())

app.set('trust proxy', 1);
app.use(exp({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs

}))

app.use(helmet())
app.use(cors())
app.use(xss())

//routes
app.use('/api/v1',routes)


const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,() => console.log(`listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()


