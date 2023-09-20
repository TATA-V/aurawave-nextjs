'use client';
import React, { useRef, useState } from 'react';
import GoBackHead from '../GoBackHead/GoBackHead';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import userState from '../../atom/userState';
import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as S from '../../styled/AuthStyled';

import GoogleAuth from '../GoogleAuth/GoogleAuth';

function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pwdRef = useRef<HTMLInputElement>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const setUserState = useSetRecoilState(userState);

  /* submit */
  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const { email, password } = data;
      await signInWithEmailAndPassword(auth, email, password);

      // 리코일에 유저정보 저장
      if (auth.currentUser) {
        const { displayName, photoURL } = auth.currentUser;
        setUserState((data) => ({
          ...data,
          username: displayName,
          photoURL: photoURL,
          isLoggedIn: true,
        }));
      }
      router.push('Main');
      setLoading(false);
    } catch (error) {
      console.log('로그인 실패:', error);
      setLoading(false);
      alert('로그인 도중에 문제가 발생했습니다.');
    }
  });

  return (
    <>
      <GoBackHead />
      <S.AuthBlock>
        {/* 뒤로가기 => GoBackHead 컴포넌트 */}
        {/* Assuming you have a GoBackHead component */}

        <S.AuthTextBox>
          <h1 className="auth-text">Login</h1>
          <p className="hi-text">안녕하세요, AuraWave입니다 :)</p>
        </S.AuthTextBox>

        <S.InputBox>
          {/* 이메일 */}
          <input type="email" placeholder="이메일 입력" />
          {/* 비밀번호 */}
          <input className="margin-top" type="password" placeholder="비밀번호 입력" />
        </S.InputBox>

        <S.SubmitBtn>로그인</S.SubmitBtn>
        <S.StyledLink href={'/signup'}>
          <p>회원가입</p>
        </S.StyledLink>

        {/* 구글 계정으로 로그인 */}
        <SnsLoginBox>
          <S.GrayLineTxtBox>
            <div className="gray-line" />
            <p className="sns-txt">SNS 계정으로 로그인</p>
            <div className="gray-line" />
          </S.GrayLineTxtBox>

          {/* 구글로 signin => GoogleAuth 컴포넌트*/}
          <GoogleAuth />
        </SnsLoginBox>
      </S.AuthBlock>
    </>
  );
}

export default Login;

const SnsLoginBox = styled.div`
  margin-top: 97px;
`;
