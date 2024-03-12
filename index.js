// 2 severs running stimultaneously.
// server.js act as backend #1 that makes the API requests. (port 3000).
// index.js is the backend #2 for the actual API. (port 4000- my API responds).

import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// Create a new Date object
var currentDate = new Date();
// Get the current date in the format YYYY-MM-DD
var year = currentDate.getFullYear();
var month = String(currentDate.getMonth() + 1).padStart(2, '0');
var day = String(currentDate.getDate()).padStart(2, '0');
// Get the current time in the format HH:MM:SS
var hours = String(currentDate.getHours()).padStart(2, '0');
var minutes = String(currentDate.getMinutes()).padStart(2, '0');


// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Power of Mindfulness in Daily Life",
    content:
      "In today's fast-paced world, finding moments of peace and tranquility can seem like a challenge. However, the practice of mindfulness offers a powerful solution. By bringing attention to the present moment without judgment, mindfulness can help reduce stress, enhance self-awareness, and improve overall well-being. In this post, we'll explore the benefits of integrating mindfulness into daily life and simple techniques to cultivate mindfulness amidst the chaos.",
    author: "Shani Bider",
    date: day  + '-' + month + '-' + year + ' ' + hours + ':' + minutes,
  },
  {
    id: 2,
    title: "Unlocking the Healing Benefits of Nature",
    content:
      "Nature has long been recognized as a source of healing and renewal for both body and mind. From the calming effect of a walk in the woods to the invigorating rush of a dip in the ocean, spending time in nature has profound effects on our well-being. In this post, we'll delve into the science behind nature's healing powers and discuss practical ways to incorporate more outdoor time into our lives for improved mental and physical health.",
    author: "Mia Williams",
    date: day  + '-' + month + '-' + year + ' ' + hours + ':' + minutes,
  },
  {
    id: 3,
    title: "The Importance of Sleep for Optimal Wellness",
    content:
      "In our quest for wellness, one often overlooked yet crucial aspect is sleep. Adequate sleep is essential for maintaining optimal physical and mental health. It plays a vital role in regulating mood, cognitive function, and immune system activity. However, in today's hyper-connected world, sleep is often sacrificed in favor of productivity or entertainment. In this post, we'll explore the importance of prioritizing sleep and share tips for improving sleep quality to enhance overall wellness.",
    author: "Samuel Green",
    date: day  + '-' + month + '-' + year + ' ' + hours + ':' + minutes,
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
