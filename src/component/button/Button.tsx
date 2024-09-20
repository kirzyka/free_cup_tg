//'use client';

import Link from "next/link";
import { FC } from "react";

interface Props {
    label: string;
    url: string;
}

const Button: FC<Props> = ({label, url}: Props) => {
    return (
        <button className="bg-active rounded-lg p-5 hover:bg-excited">
            <Link className="text-content_b" href={url}>{label}</Link>
        </button>
    );
};

export default Button;