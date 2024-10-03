"use client";

import { AppContext } from "@/context/AppContextProvider";
import { useContext, useEffect, useState } from "react";
import PointClientView from "./PointClientView";
import PointBaristaView from "./PointBaristaView";
import Point from "@/types/Point";
import { Role } from "@/types/Role";

interface Props {
    point_key: string;
}

const PointView = ({point_key}: Props) => {
    const {getPoint} = useContext(AppContext);
    const [point, setPoint] = useState<Point|undefined>();

    useEffect(() => {
        getPoint(point_key).then(setPoint);
    }, [point_key, getPoint]);

    if (!point || !point_key) {
        return (
        <div className='flex items-center w-full h-full justify-center'>
            <p>Loading...</p>
        </div>
        );  
    }

    if (point?.role === Role.CLIENT) {
        return <PointClientView point={point}/>
    }

    return <PointBaristaView point={point}/>
};

export default PointView;