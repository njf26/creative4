const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/quiz', {
  useNewUrlParser: true
});


const questionSchema = new mongoose.Schema({
  question: String,
  vote1:  Number,
  vote2: Number,
  totalVotes: Number,
  path1: String,
  path2: String,
  winner: String,
  percent: Number,
});

const commentSchema = new mongoose.Schema({
  comment: String,
  author: String,
});

const Question = mongoose.model('Question', questionSchema);
const Comment = mongoose.model('Comment', commentSchema);


app.get('/api/quiz', async (req, res) => {
  try {
    let items = await Question.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/comments', async (req, res) => {
  try {
    let items = await Comment.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/quiz/:id', async (req, res) => {
  try {
    let question = await Question.findOne({
      _id: req.params.id
    });
    res.send(question);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/quiz', async (req, res) => {
  const item = new Question({
    question: req.body.question,
    vote1: 0,
    vote2: 0,
    totalVotes: 0,
    path1: req.body.path1,
    path2: req.body.path2,
    winner: "tie.png",
    percent: 0,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/comments', async (req, res) => {
  const item = new Comment({
    comment: req.body.comment,
    author: req.body.author,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/quiz/:id', async (req, res) => {
  try {
    let question = await Question.findOne({
      _id: req.params.id
    });
    question.vote1 = req.body.vote1;
    question.vote2 = req.body.vote2;
    question.totalVotes = req.body.totalVotes;

    if(question.vote1 > question.vote2){
      question.winner = question.path1;
      question.percent = (question.vote1 / question.totalVotes) * 100;
    } else if (question.vote2 > question.vote1){
      question.winner = question.path2;
      question.percent = (question.vote2 / question.totalVotes) * 100;
    } else {
      question.winner = "tie.png";
      question.percent = 50;
    }
    question.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/quiz/:id', async (req, res) => {
  try {
    await Question.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/comments/:id', async (req, res) => {
  try {
    await Comment.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
