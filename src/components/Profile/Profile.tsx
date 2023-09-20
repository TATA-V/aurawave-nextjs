'use client';
import React from 'react';
import styled from 'styled-components';
import useAuthentication from '../../hook/useAuthentication';

import BottomTab from '../BottomTab/BottomTab';
import MyProfile from './ProfileMaterial/MyProfile';
import MyFriendAndMyPlaylist from './ProfileMaterial/MyFriendAndMyPlaylist';
import InactiveLandscape from '../Landscape/InactiveLandscape';
import LogoutAndDeleteAccount from './ProfileMaterial/LogoutAndDeleteAccount';

function Profile() {
  useAuthentication();

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
