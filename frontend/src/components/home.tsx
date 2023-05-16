import { Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
 
import React, { useEffect } from 'react'
import Nav from './Nav';
import { UserAuth } from '../AuthContext';
import { useNavigate } from 'react-router';

function Home() {
  const navigate=useNavigate()
  const {logOut, googleSignIn, user } = UserAuth()|| { googleSignIn: () => {}, user: null };

  const handleSignOut = async () => {
    try {
      await logOut();
      console.log('logging out')
    } catch (error) {
      console.log(error);
    }
  };


  const handleGoogleSignIn = async () => {
    try {
      console.log('awaiting googlesignin')
      await googleSignIn();
      console.log('user has signed in')
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/');
    }
  }, [user]);

  return (
    <>
<Nav/>
<div className='columndiv'>
<h2 style={{fontSize:'31px'}} >Quickly scan all your favourite travel sites</h2 >
<div className='columndiv2'>
    <h3>Sign in/ Sign up with Google</h3>
<Button variant="outlined" onClick={user? handleSignOut: handleGoogleSignIn}>{ user? 'Sign out': 'Sign in'}</Button>
</div>
</div>
    </>
  )
}

export default Home;