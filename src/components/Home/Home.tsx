import React from 'react';

import HomeHead from './HomeMaterial/HomeHead';
import BottomTab from '../BottomTab/BottomTab';
import Landscape from '../Landscape/Landscape';
import HelloText from './HomeMaterial/HelloText';
import RecommendPlaylist from './HomeMaterial/RecommendPlaylist';
import NewMusic from './HomeMaterial/NewMusic';
import RecommendMusic from './HomeMaterial/RecommendMusic';

function Home() {
  return (
    <>
      <HomeHead />
      <HelloText />
      <Landscape />
      <RecommendPlaylist />
      <NewMusic />
      <RecommendMusic />
      <BottomTab />
    </>
  );
}

export default Home;
