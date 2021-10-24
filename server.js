const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const mysql = require('mysql')
const axios = require('axios')
// const session = require('express-session')
// const cookieParser = require('cookie-parser')
const socket = require('socket.io')
const http = require('http')
const server = http.createServer(app)
const io = socket(server)

const PORT = '3000'
const {sequelize, Auction} = require('./models')
const router = require('./routers/index')

// app.use(cookieParser())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.set('view engine', 'html')
nunjucks.configure('views', {
    express:app,
})

// app.use(session({
//     secret: 'aaa',
//     resave: false,
//     saveUninitialized: true,
// }))

sequelize.sync({ force: false, })
    .then(() => {
        console.log('access successful')
    }).catch(() => {
        console.log('access failed')
    })

app.use('/',router)
server.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`)
})

// 절취선 // 
let m = 1
let s = 0

io.sockets.on('connection',socket=>{
    console.log('connected')
    // setInterval(()=>{
    //     socket.emit('trying',{data: s,m})
    // },1000)
})
// countDown()
function countDown(){
    let timerFunc = setInterval(() => {
        console.log(s,m)
        if(s === 0 && m>=0){
            if(s===0 && m=== 0){
                // trigga = false
                console.log('asd')
                clearInterval(timerFunc)
                // triggered()
                return
            }
            s = 60
            s--
            m--
            // timer.innerHTML = `${m}:${s}`
        } else if(s !==0 && m>=0){ 
            s-- 
            if(s<10){
                // timer.innerHTML = `${m}:0${s}`
            } else{
                // timer.innerHTML = `${m}:${s}`
            }
        }
    }, 1000) 
}