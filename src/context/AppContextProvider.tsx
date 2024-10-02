"use client";

import { addPoint, getPoints } from "@/db/indexDB";
import Cup from "@/types/Cup";
import Point from "@/types/Point";
import React, { createContext, useEffect, useState } from "react";

interface AppStateFields {
  loading: boolean;
  points: Point[];
  cups: Cup[];
}

interface AppStateFunctions {
  setPoint: (point: Point) => void;
  setPoints: (points: Point[]) => void;
  setCups: (cups: Cup[]) => void;
}

type AppState = AppStateFields & AppStateFunctions;

const initialAppState: AppStateFields = {
  loading: true,
  points: [],
  cups: [],
};

export const AppContext = createContext<AppState>(initialAppState as AppState);

interface Props {
  children: React.ReactNode;
  initialState?: AppStateFields;
}


export const AppContextProvider = ({
  children,
  initialState = initialAppState,
}: Props) => {
  const [loading, setLoading] = useState(initialState.loading);
  const [points, setPoints] = useState<Point[]>([]);
  const [cups, setCups] = useState<Cup[]>([]);

  const setPoint = async (point: Point) => {
    await addPoint(point);
  }

  useEffect(() => {
    const fetchData = async () => {
      const points: Point[] = await getPoints();//await db.getAllAsync("SELECT * FROM points");
      const cups: Cup[] = [];//await db.getAllAsync("SELECT * FROM cups");

      setPoints(points);
      setCups(cups);

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,

        points,
        setPoint,
        setPoints,

        cups,
        setCups,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
