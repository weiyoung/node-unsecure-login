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
    console.log("LOGIN")
    console.log(users)
    const user = users.filter(u => u.email == req.body.email && u.password == req.body.password)
    if (user.length === 1) {
        console.log("logged in: " + user[0].name)
        res.render('index.ejs', {name: user[0].name, email: user[0].email, password: user[0].password})
    }
})

// register requests
app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', (req, res) => {
    console.log("REGISTER")
    users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    console.log(users)
    res.render('index.ejs', {name: req.body.name, email: req.body.email, password: req.body.password})
})

app.listen(3000)
