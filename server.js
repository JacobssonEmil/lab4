const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

var currentKey = ""
var currentPassword = ""

app.get('/', (req, res) => {
    res.redirect("/identify")
})

app.post('/identify', (req, res) => {
    const username = req.body.password
    const token = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET)
    currentKey = token
    currentPassword = username
    res.redirect("/granted")
})

app.get('identify', (req, res) => {
    res.render('identify.ejs')
})

app.get('/granted', (req, res) => {
    res.render("start.ejs")
})

app.listen(8000)