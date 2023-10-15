import React from 'react';

import HomeHead from '../components/Home/HomeHead';
import BottomTab from '../components/BottomTab/BottomTab';
import Landscape from '../components/Landscape/Landscape';
import HelloText from '../components/Home/HelloText';
import RecommendPlaylist from '../components/Home/RecommendPlaylist';
import NewMusic from '../components/Home/NewMusic';
import RecommendMusic from '../components/Home/RecommendMusic';

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
