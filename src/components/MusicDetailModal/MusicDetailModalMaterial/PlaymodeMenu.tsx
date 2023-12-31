import React, { SetStateAction } from 'react';
import styled from 'styled-components';
import { useMusicLoop, useMusicShuffle } from '@/hook/useMusicControl';
import { useRouter } from 'next/navigation';
import currentTrackState from '@/atom/currentTrackState';
import { useRecoilValue } from 'recoil';

interface Props {
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
}

function PlaymodeMenu({ setOpenModal }: Props) {
  const { isLoop, playMode } = useRecoilValue(currentTrackState); // 리코일
  const router = useRouter();
  const handleLoop = useMusicLoop(); // hook
  const handleShuffle = useMusicShuffle(); // hook

  // soundtrack 페이지로 이동
  const handleSoundtrack = () => {
    router.push('/soundtrack');
    setOpenModal(false);
  };

  return (
    <PlaymodeMenuBlock $isLoop={isLoop} $playMode={playMode}>
      <button onClick={handleLoop}>
        <i className="i-loop" />
      </button>
      <button onClick={handleShuffle}>
        <i className="i-shuffle" />
      </button>
      <button onClick={handleSoundtrack}>
        <i className="i-menu" />
      </button>
    </PlaymodeMenuBlock>
  );
}

export default PlaymodeMenu;

interface IsLoop {
  $isLoop: boolean;
}

interface PlayMode {
  $playMode: string;
}

export const PlaymodeMenuBlock = styled.div<IsLoop & PlayMode>`
  width: 100%;
  display: flex;
  justify-content: space-between;

  i::before {
    color: var(--dark-blue-700);
  }

  .i-loop {
    font-size: 18px;
    &::before {
      color: ${({ $isLoop }) => ($isLoop ? 'var(--sky-blue-400)' : null)};
    }
  }

  .i-shuffle {
    font-size: 18px;
    &::before {
      color: ${({ $playMode }) => ($playMode === 'shuffle' ? 'var(--sky-blue-400)' : null)};
    }
  }

  .i-menu {
    font-size: 15px;
  }
`;
