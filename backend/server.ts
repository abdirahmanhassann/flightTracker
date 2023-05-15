const express=require('express');
const returnFlight=require('./returnFlight');

 const newfligh= new returnFlight();
 newfligh.returnFlight('dublin','london').then(()=>{
    const flight2= new returnFlight();
    flight2.returnFlight('mogadishu','london')
 })
 