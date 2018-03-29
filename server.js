const express=require('express');
const bodyParser=require('body-parser');
const app=express();


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var messages=[{
    name:'Talha',message:'Hello'
},{
    name:'Ahmed',message:'Hi'
}];

app.get('/messages',(req,res,next)=>{
    res.send(messages);
});

app.post('/messages',(req,res,next)=>{
    messages.push(req.body);
    res.sendStatus(200);
});

const server=app.listen(3000,()=>{
    console.log('Listening on port '+server.address().port);
});