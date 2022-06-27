import RegisterCard from '../../components/auth/RegisterCard.js';
import useAuth from '../../hooks/Auth.js';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function RegisterPage(){
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(user != null)
      return navigate('/');
    return undefined;
  }, [user]);  
  
  return (
    <RegisterCard/>
  );

}
