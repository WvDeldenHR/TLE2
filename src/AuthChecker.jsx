import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './config/firebase';

const AuthChecker = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        navigate('/'); // Replace '/start' with your desired redirect path
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return children;
};

export default AuthChecker;

