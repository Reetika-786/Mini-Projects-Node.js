const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');

const {connectMongoDb} = require('./connection');


const userRouter = require('./routes/user');
const {logReqRes} = require('./middlewares');


const app = express();
const port = 8000;

//connection
connectMongoDb('mongodb://127.0.0.1:27017/yt-app1')
.then(() => console.log("connected to mongodb"))
.catch((err) => console.log(err));


//middleware: plugin
app.use(express.urlencoded({extended: false}));
app.use(logReqRes('log.txt'));
app.use("/api/user", userRouter)

app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});