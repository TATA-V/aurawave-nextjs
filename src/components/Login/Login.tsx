'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import userState from '../../atom/userState';
import { auth } from '../../firebase/config';
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from 'firebase/auth';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as S from '../../styled/AuthStyled';

import GoBackHead from '../GoBackHead/GoBackHead';
import GoogleAuth from '../GoogleAuth/GoogleAuth';

function Login() {
  const pwdRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);
  const setUserInfo = useSetRecoilState(userState);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const setUserState = useSetRecoilState(userState); // 리코일

  useEffect(() => {
    // 로그인이 되어 있는 상태에서 로그인 페이지에 있다면 메인페이지로 이동
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return router.replace('/');
      }
      setUserInfo((data) => ({ ...data, username: '', photoURL: '', isLoggedIn: false }));
    });
  }, [setUserInfo, router]);

  /* submit */
  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const { email, password } = data;
      await setPersistence(auth, browserSessionPersistence); // 세션에 저장
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
      setLoading(false);
    } catch (error) {
      console.log('로그인 실패:', error);
      setLoading(false);
      alert('로그인 도중에 문제가 발생했습니다.');
    }
  });

  // 다음 input으로 focus
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextInputRef: React.RefObject<HTMLInputElement> | React.RefObject<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      nextInputRef.current?.focus();
    }
  };

  return (
    <>
      {/* 뒤로가기 => GoBackHead 컴포넌트 */}
      <GoBackHead />

      <S.LoginBlock>
        <S.AuthTextBox>
          <h1 className="auth-text">Login</h1>
          <p className="hi-text">안녕하세요, AuraWave입니다 :)</p>
        </S.AuthTextBox>

        <S.InputBox>
          {/* 이메일 */}
          <Controller
            control={control}
            rules={{ required: true, maxLength: 50, pattern: /^[\w]+@([\w]+\.)+[a-z]{2,4}$/ }}
            render={({ field: { onChange, value, onBlur } }) => (
              <input
                type="email"
                onChange={(value) => onChange(value)}
                value={value}
                onBlur={onBlur}
                onKeyUp={(e) => handleInputKeyDown(e, pwdRef)}
                placeholder="이메일 입력"
              />
            )}
            name="email"
          />
          {errors.email && errors.email.type === 'required' && (
            <p className="error-txt">필수 입력 항목입니다.</p>
          )}
          {errors.email && errors.email.type === 'maxLength' && (
            <p className="error-txt">최대 50자 이하로 입력해주세요.</p>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <p className="error-txt">올바른 이메일 형식이 아닙니다.</p>
          )}

          {/* 비밀번호 */}
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 8,
              pattern: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <input
                ref={pwdRef}
                type="password"
                className="margin-top"
                onChange={(value) => onChange(value)}
                value={value}
                onBlur={onBlur}
                onKeyUp={(e) => handleInputKeyDown(e, submitRef)}
                placeholder="비밀번호 입력"
                autoComplete="off"
              />
            )}
            name="password"
          />
          {errors.password && errors.password.type === 'required' && (
            <p className="error-txt">필수 입력 항목입니다.</p>
          )}
          {errors.password && errors.password.type === 'minLength' && (
            <p className="error-txt">최소 8자 이상으로 입력해주세요.</p>
          )}
          {errors.password && errors.password.type === 'pattern' && (
            <p className="error-txt">영문, 숫자, 특수문자 조합으로 8자리 이상 입력해주세요.</p>
          )}
        </S.InputBox>

        <S.SubmitBtn ref={submitRef} onClick={onSubmit} disabled={loading}>
          로그인
        </S.SubmitBtn>
        <S.StyledLink href={'/signup'}>회원가입</S.StyledLink>

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
      </S.LoginBlock>
    </>
  );
}

export default Login;

const SnsLoginBox = styled.div`
  margin-top: 97px;
`;
