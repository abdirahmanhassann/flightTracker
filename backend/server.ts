const express=require('express');
const returnFlight=require('./returnFlight');
const app=express()

function runqueries(){
   const newfligh= new returnFlight();
   newfligh.returnFlight('lisbon','london')
}

app.listen(5000,()=>{
   runqueries()
   console.log('app is listening on port 5000....')
})
