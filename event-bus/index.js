const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

const events = []

app.post('/events', (req, res) => {
    const event = req.body
    console.log('event received:', req.body.type)
    events.push(event)

    //post-service
    try {
        axios.post('http://posts-clusterip-srv:4000/events', event)
    } catch (error) {
        console.log(error.message)
    }
    
    // //comment-service
    try {
        axios.post('http://comment-clusterip-srv:4001/events', event)
    } catch (error) {
        console.log(error.message)
    }
    
    // //query-service
    try {
        axios.post('http://query-clusterip-srv:4002/events', event)
    } catch (error) {
        console.log(error.message)
    }

    // //moderation-service
    try {
        axios.post('http://moderation-clusterip-srv:4003/events', event)
    } catch (error) {
        console.log(error.message)
    }


    res.send({ status: 'OK' })
})

process.on("uncaughtException", function (err) {
    console.log(err);
  });

app.get('/events', (req, res) => {
    res.send(events)
})

app.listen(4005, () => {
    console.log('Listening on 4005')
})