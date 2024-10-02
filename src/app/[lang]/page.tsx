"use client";

import MainView from '@/component/view/main/MainView';
import { AppContext } from '@/context/AppContextProvider';
import { useContext } from 'react';

export default function Page() {
  const {points} = useContext(AppContext);

  return !points || !points.length ? <MainView/> : <div><p>POINTS</p>{points.map(p => <p key={p.key}>{p.name}</p>)}</div>;
}
