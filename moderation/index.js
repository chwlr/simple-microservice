const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

app.post('/events', async (req, res) => {
    const { type, data } = req.body
    console.log('event received:', req.body.type)
    
    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved'
        try {
            await axios.post('http://eventbus-clusterip-srv:4005/events', {
                type: 'CommentModerated',
                data: {
                    id: data.id,
                    postId: data.postId,
                    status,
                    content: data.content
                }
            })
        } catch (error) {
            console.log('CommentModerated error', error)
        }
    }

    res.send({})
})

app.listen(4003, () => {
    console.log('listening on 4003')
})