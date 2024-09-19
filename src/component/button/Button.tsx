//'use client';

import Link from "next/link";
import { FC } from "react";

interface Props {
    label: string;
    url: string;
}

const Button: FC<Props> = ({label, url}: Props) => {
    return (
        <button className="bg-type1-1 rounded-lg p-5 hover:bg-brown-600">
            <Link className="text-type2" href={url}>{label}</Link>
        </button>
    );
};

export default Button;