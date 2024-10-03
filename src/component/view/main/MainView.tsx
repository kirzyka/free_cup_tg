"use client";

import { useContext } from 'react';
import { AppContext } from '@/context/AppContextProvider';
import PointsView from '../points/PointsView';
import StartView from '../start/StartView';

const MainView = () => {  
  const {points} = useContext(AppContext);

 if (points?.length) {
  return <PointsView/>;
 }

 return <StartView/>

};  

export default MainView;