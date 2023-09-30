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
        const isAdmin = user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
        setUserInfo((data) => ({
          ...data,
          username: user.displayName,
          photoURL: user.photoURL,
          isLoggedIn: true,
          isAdmin: isAdmin,
        }));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [setUserInfo]);
};

export default useAuthentication;
