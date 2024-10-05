"use client";

import { dbGetPoint, dbGetPoints, dbAddPoint, dbDeletePoint } from "@/db/indexDB";
import Cup from "@/types/Cup";
import Point from "@/types/Point";
import React, { createContext, useEffect, useState } from "react";

interface AppStateFields {
  loading: boolean;
  points: Point[];
  cups: Cup[];
}

interface AppStateFunctions {
  getPoint: (key: string) => Promise<Point | undefined>;
  addPoint: (point: Point) => void;
  deletePoint: (key: string) => void;
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

  const getPoint = async (key: string) => {
    const point: Point | undefined = await dbGetPoint(key);
    return point;    
  }

  const addPoint = async (point: Point) => {
    await dbAddPoint(point);
    const points: Point[] = await dbGetPoints();
    setPoints(points);
  }

  const deletePoint = async (key: string) => {
    await dbDeletePoint(key);
    const points: Point[] = await dbGetPoints();
    setPoints(points);
  }

  useEffect(() => {
    const fetchData = async () => {
      const points: Point[] = await dbGetPoints();//await db.getAllAsync("SELECT * FROM points");
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
        getPoint,
        addPoint,
        deletePoint,

        cups,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
