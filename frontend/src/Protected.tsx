import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from './AuthContext';

const Protected = ({ children }: { children: ReactNode })=> {
  const { userr } = UserAuth() ;
  console.log(userr)
  if (!userr) {
    return <Navigate to='/' />;
  }

  return children;
};

export default Protected;