"use client";

import { useContext } from 'react';
import { AppContext } from '@/context/AppContextProvider';
import PointsView from '../points/PointsView';
import StartView from '../start/StartView';

const MainView = () => {  
  const {loading, points} = useContext(AppContext);

  if (loading) {
    return (
      <div className='flex items-center w-full h-full justify-center'>
        <p>Loading...</p>
      </div>
    );  
  }

  if (points?.length) {
    return <PointsView/>;
  }

  return <StartView/>
};  

export default MainView;