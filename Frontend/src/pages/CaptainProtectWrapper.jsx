import React, { useContext, useEffect } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { captain, setCaptain, isLoading, setIsLoading } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!token) {
      navigate('/captain-login');
      return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.status === 200) {
          setCaptain(response.data);
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.error('Error fetching captain profile:', err);
        localStorage.removeItem('token');
        navigate('/captain-login');
      });
  }, [token, navigate, setCaptain, setIsLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;