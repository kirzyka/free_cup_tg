//'use client';

import Link from "next/link";
import { FC } from "react";

interface Props {
    label: string;
    url: string;
}

const Button: FC<Props> = ({label, url}: Props) => {
    return (
        <button className="bg-active rounded-lg p-3 font-bold rounded-full hover:bg-excited w-full">
            <Link className="w-full block text-content_b" href={url}>{label}</Link>
        </button>
    );
};

export default Button;