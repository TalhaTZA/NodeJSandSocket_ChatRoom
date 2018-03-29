const express=require('express');

const app=express();

const server=app.listen(3000,()=>{
    console.log('Listening on port '+server.address().port);
});

