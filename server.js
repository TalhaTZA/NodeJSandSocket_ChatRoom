const express=require('express');

const app=express();


app.use(express.static(__dirname));

app.get('/messages',(req,res,next)=>{
    res.send([{
        name:'Talha',message:'Hello'
    },{
        name:'Ahmed',message:'Hi'
    }]);
});

const server=app.listen(3000,()=>{
    console.log('Listening on port '+server.address().port);
});