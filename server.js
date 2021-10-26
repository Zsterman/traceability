const express = require('express')

const path = require('path')

const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: '4f74ee1d88c84ca384c016e99f19242e',
    captureUncaught: true,
    captureUnhandledRejections: true
})



const app = express()
app.use(express.json())

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

app.get('/style', (req, res) => {
 res.sendFile(path.join(__dirname, '/public/styles.css'))
})

// const button = document.getElementById('1')

// button.addEventListener(click, () => {
//     rollbar.info('error')
// })

app.post('/', (req, res) => {
   
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`take us to warp 4545 ${port}!`))