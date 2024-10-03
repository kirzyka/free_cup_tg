"use client";

import PointView from '@/component/view/point/PointView';
import { useParams } from 'next/navigation';

export default function Page() {
    const {point_key} = useParams();
    
    return <PointView point_key={point_key as string}/>;
}
