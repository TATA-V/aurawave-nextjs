'use client';
import React from 'react';
import styled from 'styled-components';

import BottomTab from '../components/BottomTab/BottomTab';
import MyProfile from '../components/Profile/MyProfile';
import MyFriendAndMyPlaylist from '../components/Profile/MyFriendAndMyPlaylist';
import InactiveLandscape from '../components/Landscape/InactiveLandscape';
import LogoutAndDeleteAccount from '../components/Profile/LogoutAndDeleteAccount';

function Profile() {
  return (
    <ProfileBlock>
      <MyProfile />
      <MyFriendAndMyPlaylist />
      <InactiveLandscape />
      <LogoutAndDeleteAccount />
      <BottomTab />
    </ProfileBlock>
  );
}

export default Profile;

const ProfileBlock = styled.div`
  min-height: 100vh;
  background: linear-gradient(to top, #f7f7fa, #ffffff);
  position: relative;
  padding-bottom: 50px;
`;
