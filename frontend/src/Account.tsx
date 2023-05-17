import React,{useRef, useState} from 'react'
import { GiAirplaneArrival } from 'react-icons/gi'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { Input, InputAdornment, TextField,OutlinedInput,FormHelperText } from '@mui/material'
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import Button from '@mui/material/Button';
import { UserAuth } from './AuthContext'
import { arrayRemove, arrayUnion, collection, doc, getDocs, setDoc, 
    updateDoc } from "@firebase/firestore";
import { db } from './firebase'
import {  } from '@material-ui/core';

interface Iinfo{
    from:string;
    to:string;
    type:string;
    budget:number
}
function Account() {
 const {userr}=UserAuth()
 
 const [info,setinfo]=useState<Iinfo>({ 
    from:'',
    to:'',
    type:'',
    budget:0
} )
    const [error,seterror]=useState(false)
 //console.log(userr.email)

 function changed(e:any){
    seterror(false)
    setinfo((i:any)=>
   { return{
       ...i,
        [e.target.name]:e.target.value
    }})
    console.log(info)
 }

async function clicked(){
    if(info.from && info.to && info.type){
        console.log('runnng function')
        await setDoc(doc(db,'users',userr.email),{queries:arrayUnion(info) },{merge:true})
    }
    else{
        seterror(true)
    }

}


  return (
    <>
  <nav>
        <div className='rowdiv'>
        <GiAirplaneArrival style={{height:'29px',width:'29px',color:'white'}}/>
   <h5>Cheap flight ticket tracker</h5>
        </div>
        <div className='rowdiv'>
            <RiLogoutBoxLine style={{height:'19px',width:'19px',color:'white'}}/>
            <p style={{fontSize:'14px'}}>Log out</p>
        </div>
    </nav>
    {
        error &&
        <p>Please fill in all the information</p>
    }
    <form className='rowdiv' 
    style={{marginTop: '100px',
    placeContent:' center',
    flexWrap:'wrap'}}> 
    <Input
    name='from'
value={info && info.from}
    onChange={changed}
          id="input-with-icon-adornment"
          placeholder='from'

          sx={{backgroundColor:'white',padding:'10px 15px',borderRadius:'2px 2px 0px 0px'}}
          startAdornment={
            <InputAdornment  
            position="start">
              <AddLocationIcon style={{color:'gray'}}/>
            </InputAdornment>
          }
        />  
    <Input
    name='to'
    onChange={changed}
    value={info && info.to}
          id="input-with-icon-adornment"
          placeholder='to'
          sx={{backgroundColor:'white',padding:'10px 15px',borderRadius:'2px 2px 0px 0px'}}
          startAdornment={
            <InputAdornment  
            position="start">
              <AddLocationIcon style={{color:'gray'}}/>
            </InputAdornment>
          }
        /> 

        <FormControl sx={{width:'124px',backgroundColor:'white',borderRadius:'2px 2px 0px 0px',height:'52px'}} >
  <InputLabel id="demo-simple-select-label"
  sx={{    marginTop: '1.5px'}}
  >Flight type</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    name='type' 
    value={info && info.type}
    onChange={changed}

    label="Flight type"
   // onChange={changed}
  >
    <MenuItem value={'Returning'} >Returning</MenuItem>
    <MenuItem value={'One way'} >One way</MenuItem>
    <MenuItem value={'Multi-city'}>Multi-city</MenuItem>
  </Select>
</FormControl>
<TextField id="outlined-basic" label="Budget" type='number' variant="outlined" name='budget'
 value={info && info.budget}
 onChange={changed}
 sx={{width:'100px',background:'white',height:'52px',borderRadius:'2px 2px 0px 0px'
}} 
/>

          
<Button variant="contained" sx={{backgroundColor:'white',color:'darkblue',padding:'14px 27px'}}
onClick={clicked}
>Save Query</Button>
          </form>
    </>
  )
}

export default Account