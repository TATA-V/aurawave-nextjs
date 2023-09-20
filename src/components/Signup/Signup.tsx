'use client';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as S from '../../styled/AuthStyled';
import { auth } from '../../firebase/config';

import GoBackHead from '../GoBackHead/GoBackHead';
import GoogleAuth from '../GoogleAuth/GoogleAuth';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

function Signup() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const checkPwdRef = useRef<HTMLInputElement>(null);
  const pwdNumRef = useRef<HTMLInputElement>(null);
  const checkNumPwdRef = useRef<HTMLInputElement>(null);

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // pwdNumRef.current = watch('password');
  // checkNumPwdRef.current = watch('checkPassword');

  /* 일반 이메일으로 회원가입 */
  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      if (pwdNumRef.current === checkNumPwdRef.current) {
        const { email, username, password } = data;
        // 회원가입
        await createUserWithEmailAndPassword(auth, email, password);

        const user = auth.currentUser;
        if (user) {
          await updateProfile(user, { displayName: username });
        }

        // 로그인 페이지 이동
        router.push('Login');
        setLoading(false);
      }
    } catch (error) {
      console.log('회원가입 실패:', error);
      setLoading(false);
      alert('회원가입 도중에 문제가 발생했습니다.');
    }
  });

  return (
    <>
      {/* 뒤로가기 => GoBackHead 컴포넌트 */}
      <GoBackHead />

      <S.AuthBlock>
        <S.AuthTextBox>
          <h1 className="auth-text">Sign Up</h1>
          <p className="hi-text">안녕하세요, AuraWave입니다 :)</p>
        </S.AuthTextBox>

        <S.InputBox>
          {/* 이메일 */}
          <input type="email" placeholder="이메일 입력" />
          {/* 닉네임 */}
          <input className="margin-top" type="email" placeholder="닉네임 입력" />
          {/* 비밀번호 */}
          <input className="margin-top" type="password" placeholder="비밀번호 입력" />
          {/* 비밀번호 확인 */}
          <input className="margin-top" type="password" placeholder="비밀번호 확인" />
        </S.InputBox>

        <S.SubmitBtn>회원가입</S.SubmitBtn>
        <S.StyledLink href={'/login'}>이미 계정이 있으신가요?</S.StyledLink>

        {/* 구글 계정으로 로그인 */}
        <S.GoogleBox>
          <S.GrayLineTxtBox>
            <div className="gray-line" />
            <p className="sns-txt">SNS 계정으로 로그인</p>
            <div className="gray-line" />
          </S.GrayLineTxtBox>

          {/* 구글로 signin => GoogleAuth 컴포넌트*/}
          <GoogleAuth />
        </S.GoogleBox>
      </S.AuthBlock>
    </>
  );
}

export default Signup;
