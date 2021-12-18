const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//import models
const Post = require('./src/post');
//define application
const app = express()

//define db Connection
const db = mongoose.connect('mongodb://localhost:27017/first-node-api')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', function(req, res){
    //here we handle the request for root route
    res.send({ping: 'pong'})
})

//operations: CRUD operations

//now get list of all posts

app.get('/posts', funtion(req, res){
    Post.find({}, function(error, posts){
        if(error) {
            //send error response
            res.status(500).send({error: 'unable to save post '})
        } else {
            //send success response
            res.status(200).send(savedPost)
        }
    })
});

//post

app.post('/posts', function(req, res) {
    //it helps to get values from request payload
      const title = req.body.title
      const author = req.body.author
      const content = req.body.content

      //it helps to assign values to post model
      var post = new Post();
      post.title = title
      post.author = author
      post.content = content
        post.save(function(error, savedPost){
            if(error) {
                //send error response
                res.status(500).send({error: 'unable to save post '})
            } else {
                //send success response
                res.status(200).send(savedPost)
            }
        })
      
})

//update post: CRUD operations

app.put('/posts/:id', function(req, res) {
    let id = req.params.id
    let title = req.body.title,
    let author = req.body.author,
    let content = req.body.content
    
    let index = posts.findIndex((student)=>{
        return (posts.id == Number.parseInt(id))
    })

    console.log(id, req.body, index);
    
    if(index >= 0){
        let pst = posts[index]
        pst.title = title
        pst.author = author
        pst.content = content
        res.json(pst)
    } else {
        res.status(404)
        res.end()
    }
    
    console.log(id);
    res.json(id)
})

//delete a post 

app.delete("/posts/:id", function(req, res){
    let id = req.params.id;
    let index = posts.findIndex((student)=>{
        return (posts.id == Number.parseInt(id))
    })
    if(index >= 0){
        let pst = posts[index]
        posts.splice( index , 1)
        res.json(pst)
    } else {
        res.status(404)
    }

})


app.listen(3001, function(){
    console.log('server is running at port 3001')
})
