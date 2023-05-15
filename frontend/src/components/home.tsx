import { Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
 
import React from 'react'
import Nav from './Nav';

function Home() {
  return (
    <>
<Nav/>
<div className='columndiv'>
<h2 style={{fontSize:'31px'}} >Quickly scan all your favourite travel sites</h2 >
<div className='columndiv2'>
    <h3>Sign in/ Sign up with Google</h3>
<Button variant="outlined">Signin</Button>
</div>
</div>
    </>
  )
}

export default Home;