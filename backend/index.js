const express = require('express')
const app = express()
const port =5000;
const mongoDB = require('./db')



mongoDB();

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requests-With,Content-Type,Accept"
  );
  next();
})

// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin', ['http://localhost:3000']);
//   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.append('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });


app.use(express.json());
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));


app.listen(port,()=>{
    console.log(`app is listening on port ${port} `)

})