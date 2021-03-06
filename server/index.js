require('dotenv').config({ path: __dirname + '/../.env' })
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const cors = require('cors')
const ac = require('./controllers/authController')
const pc = require('./controllers/postController')
const initSession = require('./middleware/initSession');
const authCheck = require('./middleware/authCheck');
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env


const app = express()
app.use(express.json())
app.use(cors())

app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}))


massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('DB Connected')
})

app.use(initSession)



app.post('/api/login', ac.login)
app.post('/api/signup', ac.signup)
app.get('/api/user', authCheck, ac.getUser)
app.delete('/api/logout', ac.logout)

app.post('/api/addpost', pc.addPost)
app.get('/api/getposts', pc.getPosts)
app.get('/api/selected/:postId', pc.getSelected)
app.put('/api/editpost/:postId', pc.editPost)
app.post('/api/addcomment', pc.addComment)
app.get('/api/getcomments', pc.getComments)


// app.use(express.static(__dirname + '/../build'))

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))