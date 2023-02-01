import React, {
    createContext,
    useMemo,
    useContext,
    useState,
    useEffect,
  } from 'react';
  import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
    getIdToken,
  } from 'firebase/auth';
  import { auth } from '../firebase';
  import useLocalStorage from 'use-local-storage';
  import { useNavigate } from 'react-router';
  
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    hd: 'iiitkottayam.ac.in',
  });
  
  const URL = 'https://betalabs-portal-backend-production.up.railway.app';
  
  const AuthContext = createContext({});
  
  export const AuthProvider = ({ children }) => {
    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const href = window.location.href;
    const [token, setToken] = useLocalStorage('token', '');
  
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);
  
    useEffect(
      () =>
        onAuthStateChanged(auth, async user => {
          setLoadingInitial(false);
        //   let exceptions = ['anujsrivastava980@gmail.com','shashank.srivastava25sks@gmail.com','pcm.sudhanshu18@gmail.com','animeshkumar2611@gmail.com']
          if (user) {
  
            if(user.email.split('@')[1] !== 'iiitkottayam.ac.in')
              return logout()
            // console.log(user)
  
            setLoadingInitial(true);
            // console.log(user);
            const token = await getIdToken(user);
            setToken(token);
  
            const User = {
              name: user.displayName,
              email: user.email,
              photo: user.photoURL,
              g_id: user.uid,
              score: 0,
            };
  
            setUser(User);
          }
        }),
      []
    );
  
    useEffect(() => {
      const func = async () => {
        // console.log(token, user);
        if (token !== '' && user) {
          await getUserDataFromMongo(token, user);
  
          if (href.split('/')[3] === '') navigate('/main');
          else{
            let url = href.split('/').slice(3).join('/') 
            navigate(`/${url}`);}
        }
      };
  
      func();
    }, [user]);
  
    const getUserDataFromMongo = async (token, results) => {
      let User = results;
      // console.log(User)
      // console.log("TOKEN : ", token)
      // console.log(User)
      let data = await fetch(`${URL}/auth/adduser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: User,
        }),
      });
  
      data = await data.json();
  
      // console.log(data);
      if (data.error) return logout();
  
      // console.log('Data fetched');
  
      if (data.code === 2) setUser(data.data);
  
      setUser(User);
      setLoadingInitial(false);
    };
  
    const signInPopup = async () => {
        console.log("Sign in")
      setLoading(true);
      try {
        const results = await signInWithPopup(auth, provider);
        // console.log(results.user.email.split('@')[1])
  
      } catch {
        console.log('error');
      } finally {
        setLoading(false);
      }
    };
  
    const logout = () => {
      console.log("Logging out")
        setLoading(true);
      signOut(auth)
        .catch(error => console.log(error))
        .finally(() => {
          setToken('');
          console.log("Logged out")
          setUser(null);
          // console.log('Logging out...');
          setLoading(false);
          navigate('/');
        });
    };
  
    const memo = useMemo(
      () => ({
        token,
        user,
        loading,
        error,
        signInPopup,
        logout,
      }),
      [user, loading, error]
    );
  
    return (
      <AuthContext.Provider value={memo}>
        {!loadingInitial && children}
      </AuthContext.Provider>
    );
  };
  
  export default function useAuth() {
    return useContext(AuthContext);
  }
  