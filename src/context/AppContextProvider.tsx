"use client";

import { dbGetPoint, dbGetPoints, dbAddPoint, dbDeletePoint, dbGetCups, dbAddCup, dbDeactivateCups } from "@/db/indexDB";
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
  addCup: (point: Point) => void;
  deactivateCups: (point_key: string) => void;
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

  const addCup = async (point: Point) => {
    await dbAddCup(point);
    const cups: Cup[] = await dbGetCups();
    setCups(cups);
  }

  const deactivateCups = async (point_key: string) => {
    await dbDeactivateCups(point_key);
  }

  useEffect(() => {
    const fetchData = async () => {
      const points: Point[] = await dbGetPoints();
      const cups: Cup[] = await dbGetCups();

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
        addCup,
        deactivateCups,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
