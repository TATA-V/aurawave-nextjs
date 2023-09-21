'use client';
import React from 'react';
import PeopleCircleSvg from '@/../public/PeopleCircleSvg.svg';
import styled from 'styled-components';

function MyFriendAndMyPlaylist() {
  return (
    <MyFriendAndMyPlaylistBlock>
      <li className="list-box">
        <PeopleCircleSvg />
        <p className="list-text">친구 목록</p>
      </li>
      <li className="list-box">
        <i className="i-list-circle" />
        <p className="list-text">내 플레이리스트 목록</p>
      </li>
    </MyFriendAndMyPlaylistBlock>
  );
}

export default MyFriendAndMyPlaylist;

const MyFriendAndMyPlaylistBlock = styled.ul`
  padding: 0 23px 37px 23px;

  .list-box {
    height: 48px;
    border-bottom: 1px solid var(--blue-gray-200);
    display: flex;
    align-items: center;
  }

  .list-text {
    color: var(--dark-blue-800);
    font-size: 0.8125rem;
    padding-left: 6px;
    cursor: pointer;
  }

  .i-list-circle {
    color: var(--dark-blue-800);
    font-size: 14px;
    cursor: pointer;
  }
`;
