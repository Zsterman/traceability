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

let students = []

app.post('/api/student', (req, res) => {
    let {name} = req.body
    name = name.trim()

    const index = students.findIndex(studentName => studentName === name)

    if(index === -1 && name !== ''){
    students.push(name)
    rollbar.log('Student added successfully', {author: 'Zachary', type: 'manual entry'})
    res.status(200).send(students)

    } else if(name === ''){
        rollbar.error('No name given')
        res.status(400).send('Must provide a name')
    } else {
        rollbar.critical('Student already exists')
        res.status(400).send('student already exists')
    }
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`take us to warp 4545 ${port}!`))