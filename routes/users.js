const express = require('express')
const mysql = require('mysql')
const router = express.Router()

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_example'
})

function getConnection() {
    return pool
}

// List users
router.get('/users', (req, res) => {
    console.log("Fetching all users")
    
    const connection = getConnection()
    const queryString = "SELECT * FROM Users"
    
    connection.query(queryString, (err, rows, fields) => {
        if(err) {
            console.log("Failed to query for users: " + err)
            res.sendStatus(500)
            return
        }
        
        console.log("I think we fetched users successfully")
        res.json(rows)
    })
})


// List custom user
router.get('/custom_user/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const connection = getConnection()
    const userId = req.params.id
    const queryString = "SELECT * FROM Users WHERE id = ?"

    connection.query(queryString, [userId], (err, rows, fields) => {
        if(err) {
            console.log("Failed to query for users: " + err)
            res.sendStatus(500)
            return
        }

        console.log("I think we fetched users successfully")

        const users = rows.map((row) => {
            return {firstName: row.first_name, lastName: row.last_name}
        })

        res.json(users)
    })

})

// List user
router.get('/user/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const connection = getConnection()
    const userId = req.params.id
    const queryString = "SELECT * FROM Users WHERE id = ?"

    connection.query(queryString, [userId], (err, rows, fields) => {
        if(err) {
            console.log("Failed to query for users: " + err)
            res.sendStatus(500)
            return
        }

        console.log("I think we fetched users successfully")

        res.json(rows)
    })
})

// Create user
router.post('/create_user', (req, res) => {
    console.log("Trying to create a new user ...")
    console.log(req.body.create_first_name)
    console.log(req.body.create_last_name)

    const firstName = req.body.create_first_name
    const lastName = req.body.create_last_name

    const queryString = "INSERT INTO Users (first_name, last_name) VALUES (?, ?)"
    getConnection().query(queryString, [firstName, lastName], (err, results, fields) => {
        if (err) {
            console.log("Failed to insert new user: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Inserted a new user with id: " + results.insertId)
        res.end()
    })
})

module.exports = router