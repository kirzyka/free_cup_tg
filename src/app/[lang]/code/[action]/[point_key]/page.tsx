"use client";

import CodeView from '@/component/view/code/CodeView';
import { Action } from '@/types/Action';
import { useParams } from 'next/navigation';

export default function Page() {
  const {action, point_key} = useParams();

  return (
    <CodeView action={action as Action} point_key={point_key as string}/>
  );
}
