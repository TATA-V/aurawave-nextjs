import React from 'react';
import styled from 'styled-components';
import defaultProfileJpg from '@/assets/jpg-file/landscape.jpg';
import Image from 'next/image';

function InactiveLandscape() {
  return (
    <LandscapeBlock>
      <div className="landscape">
        <Image
          className="image"
          width={346.2}
          height={165.2}
          src={defaultProfileJpg}
          placeholder="blur"
          alt="landscape"
        />
        <p className="stars-text">Stars</p>
      </div>
    </LandscapeBlock>
  );
}

export default InactiveLandscape;

const LandscapeBlock = styled.div`
  opacity: 0.87;
  display: flex;
  justify-content: center;

  .landscape {
    width: 348px;
    height: 167px;
    border: 1px solid var(--gray-100);
    border-radius: 7px;
    display: flex;
    justify-content: end;
    align-items: end;
  }

  .stars-text {
    position: absolute;
    margin: 9px 13px 9px 13px;
    color: var(--white-100);
    font-size: 0.75rem;
    font-weight: 400;
    font-family: 'Bubblegum Sans', cursive;
  }

  .image {
    border-radius: 6px;
    display: flex;
    justify-content: center;
  }
`;
