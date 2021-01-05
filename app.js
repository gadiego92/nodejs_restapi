// load our app server using express somehow ...
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = require('./routes/users.js')
const PORT = process.env.PORT || 3003

app.use(morgan('short'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))
app.use(router)

// localhost:PORT
app.listen(PORT, () => {
    console.log("Your server is up and listening on: " + PORT)
})

app.get('/', (req, res) => {
    console.log("Responding to root route")
    res.send("Hello from root")
})
