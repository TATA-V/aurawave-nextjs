import { AtomEffect } from 'recoil';

const ONE_HOUR = 3600 * 1000; // 1시간
const getExpirationTime = () => Date.now() + ONE_HOUR;

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    // 로컬에 저장된 키 가져오기
    const savedValue = localStorage.getItem(key);
    const expirationTime = localStorage.getItem(`${key}_expiration`);

    // 만료 시간이 지났거나 값이 없을 경우 삭제
    if (expirationTime && Date.now() > parseInt(expirationTime, 10)) {
      localStorage.removeItem(key); // 값 삭제
      localStorage.removeItem(`${key}_expiration`); // 만료 시간 정보 삭제
    } else if (savedValue != null) {
      // 만료 시간이 지나지 않았고, 값이 존재하는 경우에는 해당 값을 Recoil 상태에 설정
      setSelf(JSON.parse(savedValue));
    }

    // Recoil 상태가 변경될 때 호출되는 콜백 함수를 정의
    onSet((newValue, _, isReset) => {
      // Recoil 상태가 재설정되는 경우, 해당 키와 만료 시간 정보를 삭제
      if (isReset) {
        localStorage.removeItem(key);
        localStorage.removeItem(`${key}_expiration`);
      } else {
        // Recoil 상태가 업데이트되는 경우, 새로운 값을 로컬 스토리지에 저장하고 만료 시간 정보를 갱신
        localStorage.setItem(key, JSON.stringify(newValue)); // 값 저장
        localStorage.setItem(`${key}_expiration`, getExpirationTime().toString()); // 만료 시간 갱신
      }
    });
  };

export default localStorageEffect;
