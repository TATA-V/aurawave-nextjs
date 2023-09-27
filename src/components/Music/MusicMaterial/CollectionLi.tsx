'use client';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface Props {
  image: any;
  title: string;
  composer: string;
}

function CollectionLi({ image, title, composer }: Props) {
  return (
    <CollectionLiBlock>
      <div className="details-box">
        <Image
          className="image"
          width={49}
          height={49}
          src={image}
          alt="music"
          placeholder="blur"
        />
        <p className="details">
          <span className="title">{title}</span>
          <br />
          <span className="composer">{composer}</span>
        </p>
      </div>
    </CollectionLiBlock>
  );
}

export default CollectionLi;

const CollectionLiBlock = styled.li`
  width: 346.12px;
  padding-bottom: 17px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .details-box {
    display: flex;
    align-items: center;
  }

  .image {
    border: 1px solid var(--gray-100);
    border-radius: 2px;
    cursor: pointer;
  }

  .details {
    width: 225px;
    padding-left: 16px;
    line-height: 1.1rem;
  }

  .title {
    color: var(--dark-blue-900);
    font-size: 0.9375rem;
    font-weight: 500;
    cursor: pointer;
  }

  .composer {
    color: var(--gray-400);
    font-size: 0.8125rem;
    font-weight: 400;
    cursor: pointer;
  }
`;
