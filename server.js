const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const http=require('http').Server(app);
const io=require('socket.io')(http);
const mongoose=require('mongoose');
const config=require('./config');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var messages=[{
    name:'Talha',message:'Hello'
},{
    name:'Ahmed',message:'Hi'
}];

const dbUrl=`mongodb://${config.user}:${config.password}@ds227939.mlab.com:27939/messages`;

const Messages=mongoose.model('Messages',{
    name: String,
    message:String
});

app.get('/messages',(req,res,next)=>{
    res.send(messages);
});

app.post('/messages',(req,res,next)=>{
    let message=new Messages(req.body);
    message.save((err)=>{
        if(err){
            res.sendStatus(500);
        }
        messages.push(req.body);
        io.emit('message',req.body);
        res.sendStatus(200);
    });
});

io.on('connection',(socket)=>{
    console.log('user connected');
});

mongoose.connect(dbUrl,(err)=>{
    console.log('Connection Successful')
});

const server=http.listen(3000,()=>{
    console.log('Listening on port '+server.address().port);
});