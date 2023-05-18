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
  const g=document.docs.map((doc:any)=>{return{...doc.data(),id:doc.id}})
 // const emails=document.docs.map((doc:any)=>doc.id)
console.log(g)
  for (const item of g) {
   console.log(item,item.id,'item')
   //console.log(email)
   if (item.queries) {
     for (const element of item.queries) {
       if (element.from && element.to) {
         let newflight = new returnFlight();
        let budget;
    
        while(!budget){
         budget= await newflight.returnFlight(element.from.trim(), element.to.trim(),element.budget,item.id);
        }
          
       }
     }
   }
 }
}
fb()
// app.listen(5000,()=>{
//    console.log('app is listening on port 5000....')
// })
