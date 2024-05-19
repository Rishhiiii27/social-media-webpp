const express = require('express');
const dotenv = require('dotenv')
dotenv.config('./.env') ;
const authRouter = require('./routers/authRouter');
const postRouter = require('./routers/postRouter');
const dbConnect = require('./dbConnect');


const app = express();
app.use(express.json());
app.use('/auth',authRouter);
app.use('/post',postRouter);



app.get('/',(req,res)=>
{
    res.send('hello');
    console.log('you are here')
})

const port = process.env.PORT;

app.listen(port, ()=>
{
    console.log('listening on port:',port);
}
)