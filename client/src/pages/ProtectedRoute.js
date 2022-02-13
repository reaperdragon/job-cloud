import React, { Children } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

import {useAppContext} from '../context/appContext'

const ProtectedRoute = ({children}) => {

    const { user } = useAppContext()
    
    if (!user) {
         return <Navigate to="/landing" />;
    }
    return children

 
}

export default ProtectedRoute