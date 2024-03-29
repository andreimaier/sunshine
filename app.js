//mongodb+srv://andrei:andrei@cluster0.rkr6oej.mongodb.net/test

/* 
const distinctColors = require('distinct-colors').default
let palette = distinctColors()
console.log(palette) */


/* var cron = require('node-cron');
cron.schedule('08 14 * * Sat', () => {
    console.log('I have arrived, I am cronos!')
})
console.log(cron) */
/* const { hello } = require('./testModule')
hello() */

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
mongoose.set('strictQuery', false);
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000;
app.listen(port, () => { 
  console.log(`serveru alearga la ${port}`)
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

mongoose.connect('mongodb+srv://andrei:andrei@cluster0.rkr6oej.mongodb.net/nodePlayground'), {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

//create schema
const studentSchema = {
    index: Number,
    date: String, 
    class: Array
}
const Student = mongoose.model('Student', studentSchema)

/* 
let testing = Student.find({ date: "3/29/2023" }).exec(console.log)
 */


app.get('/api', async (request, response) => {
  response.json(await Student.find({}));
    /* res.sendFile(__dirname + './public/index.html') */ //instead of putting things in public folder
    console.log(`serveru alearga la ${port}`)
})
let a = 1;

app.post("/api", (request, response) => {
  console.log("I got a request!");
  console.log(request.body);
  const dailyScores = new Student({ 
    index: a++,
    date: new Date(Date.now()).toLocaleDateString(),
    class: request.body
  })

  dailyScores.save(function (err) {
    if (err) console.log(err)
  })
  response.json(dailyScores);
  response.redirect('/')
});


/* //post the list to DB
app.post("/list", (request, response) => {
  console.log("I got a request for a list!");
  console.log(request.body);
  const dailyScores = new Student({ 
    index: a++,
    date: new Date(Date.now()).toLocaleDateString(),
    class: request.body
  })

  dailyScores.save(function (err) {
    if (err) console.log(err)
  })
  response.json(dailyScores);
  response.redirect('/')
}); */