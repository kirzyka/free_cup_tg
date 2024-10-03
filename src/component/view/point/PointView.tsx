"use client";

import { AppContext } from "@/context/AppContextProvider";
import { useContext } from "react";
import PointClientView from "./PointClientView";
import PointBaristaView from "./PointBaristaView";

const PointView = () => {
    const {loading} = useContext(AppContext);

    if (loading) {
        return <PointClientView/>
    }

    return <PointBaristaView/>
};

export default PointView;