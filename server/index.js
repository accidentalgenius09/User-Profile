const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const {connect} = require('./database/conn.js')
const {router} = require('./router/route.js')
const app =express()

//middlewares
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}))
app.use(morgan('tiny'))
app.disable('x-powered-by')


app.get("/",(req,res)=>{
    res.status(201).json("Home Get req")
})

//api routes
app.use('/api',router)

connect().then(()=>{
    try {
        app.listen(3000,()=>{
            console.log("server listening to 3000");
        })
        
    } catch (error) {
        console.log("can't connect to server");
    }
}).catch(error=>{
    console.log("Invalid db connection");
})

