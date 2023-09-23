'use client';
import React from 'react';
import styled from 'styled-components';
import GoogleSvg from '@/../public/GoogleSvg.svg';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { setUserDoc } from '@/firebase/user';
import userState from '@/atom/userState';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';

function GoogleAuth() {
  const provider = new GoogleAuthProvider();
  const setUserState = useSetRecoilState(userState); // 리코일
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      const user = auth.currentUser;

      if (user) {
        const { uid, email, displayName, photoURL } = user;
        // 리코일에 유저정보 저장
        if (auth.currentUser) {
          setUserState((data) => ({
            ...data,
            username: displayName,
            photoURL: photoURL,
            isLoggedIn: true,
          }));
        }
        router.replace('/');

        // firestore에 유저 정보 저장
        if (uid !== null && displayName !== null && email !== null && photoURL !== null) {
          const userData = {
            uid: uid,
            email: email,
            username: displayName,
            photoURL: photoURL,
          };
          setUserDoc({ userUID: uid, userData });
        }
      }
    } catch (error) {
      console.log(error);
      alert('회원가입 도중에 문제가 발생했습니다.');
    }
  };

  return (
    <GoogleAuthBlock>
      <GoogleBtn onClick={handleGoogleLogin}>
        <GoogleSvg />
        <p className="signin-txt">Sign in with Google</p>
      </GoogleBtn>
    </GoogleAuthBlock>
  );
}

export default GoogleAuth;

const GoogleAuthBlock = styled.div`
  padding-top: 22.5px;
  display: flex;
  justify-content: center;
`;

const GoogleBtn = styled.button`
  width: 170px;
  height: 43px;
  padding: 0 15px 0 15px;
  border: 1px solid var(--gray-100);
  border-radius: 5px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .signin-txt {
    color: var(--dark-blue-650);
    font-size: 0.75rem;
    font-weight: 400;
  }
`;
