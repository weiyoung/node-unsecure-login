const express = require('express')
const app = express()

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.render('login.ejs')
})

// login requests
app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/login', (req, res) => {
    console.log("USE ONE OF THESE TO LOGIN:")
    console.log(users)
    const filteredUsers = users.filter(user => user.email === req.body.email && user.password === req.body.password)
    if (filteredUsers.length !== 1) return
    
    res.render('index.ejs', {name: filteredUsers[0].name, email: filteredUsers[0].email, password: filteredUsers[0].password})
})

// register requests
app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', (req, res) => {
    const duplicateEmails = users.filter(user => user.email === req.body.email)
    if (duplicateEmails.length !== 0) return

    users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    res.render('index.ejs', {name: req.body.name, email: req.body.email, password: req.body.password})
})

app.listen(3000)
