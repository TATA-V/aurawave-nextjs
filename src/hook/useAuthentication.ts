'use client';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/config';
import userState from '@/atom/userState';

const useAuthentication = () => {
  const setUserInfo = useSetRecoilState(userState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo((data) => ({
          ...data,
          username: user.displayName,
          photoURL: user.photoURL,
          isLoggedIn: true,
        }));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [setUserInfo]);
};

export default useAuthentication;
