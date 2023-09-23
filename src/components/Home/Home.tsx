import React from 'react';

import HomeHead from './HomeMaterial/HomeHead';
import BottomTab from '../BottomTab/BottomTab';
import Landscape from '../Landscape/Landscape';
import HelloText from './HomeMaterial/HelloText';

function Home() {
  return (
    <>
      <HomeHead />
      <HelloText />
      <Landscape />
      <BottomTab />
    </>
  );
}

export default Home;
