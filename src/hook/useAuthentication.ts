import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config'; // Firebase 인증 설정 파일 또는 모듈을 가져옵니다.
import userState from '../atom/userState';

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

    // 컴포넌트가 unmount될 때 구독 해제
    return () => {
      unsubscribe();
    };
  }, [setUserInfo]);
};

export default useAuthentication;
