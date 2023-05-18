import { Query } from "firebase-admin/firestore";
import { firestore } from "firebase-functions/v1";
const { getFirestore, collection, getDoc, doc} = require("firebase/firestore");

const express=require('express');
const returnFlight=require('./returnFlight');
let {db} = require('./firebase/firebase')
const app=express()

function runqueries(){

   const newfligh= new returnFlight();
   newfligh.returnFlight('lisbon','london')
}

async function fb(){
   const document = await db.collection('users').get();
  const g=document.docs.map((doc:any)=>doc.data())
 g.forEach((i:any)=>{
    i.queries.forEach( async(element:any) => {
       if(element.from && element.to ){
         let newflight= new returnFlight();
        await newflight.returnFlight(element.from.trim(),element.to.trim())

      }
    });

 }) 
   console.log(g[0].queries);
   console.log(g.id)
}
fb()
// app.listen(5000,()=>{
//    console.log('app is listening on port 5000....')
// })
