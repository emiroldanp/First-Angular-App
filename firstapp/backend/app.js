const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://emi:Tgz4N2nwwLJO6JjK@angularcluster.4fqyz.mongodb.net/<dbname>?retryWrites=true&w=majority",
 {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log("Connected to MongoDB")
})
.catch(() => {
  console.log("Connection failed!!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  res.status(201).json({
    message: "Post added succesfully!"
  });
});

app.get('/api/posts',(req, res, next) => {
  const posts = [
    {
      id:'a01650141',
      title: 'First server-side post',
      content: 'This comes from the server'
    },
    {
      id:'a01339939',
      title: 'Second server-side post',
      content: 'This comes from the server!'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched succesfully',
    posts: posts
  });
});

module.exports = app;
