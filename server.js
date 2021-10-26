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
app.use(rollbar.errorHandler())

app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

app.get('/style', (req, res) => {
 res.sendFile(path.join(__dirname, '/public/styles.css'))
})

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.js'))
})


let favorites = []

app.post('/api/favorites', (req, res) => {
    let {name,favoriteFood} = req.body;

    const newFavoriteObj = {
        name,
        favoriteFood
    }
    favoriteFood.push(newFavoriteObj)

    rollbar.info('successfully added')

    res.status(200).send('Successfully Added')
})


const port = process.env.PORT || 4545

app.listen(port, () => console.log(`take us to warp 4545 ${port}!`))