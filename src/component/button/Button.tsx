"use client";

import { useLabel } from "@/hooks/useLabel";
import Link from "next/link";
import { FC } from "react";

interface Props {
    label: string;
    url?: string;
    onClick?: () => void;
}

const Button: FC<Props> = ({label, url, onClick}: Props) => {
    const {language} = useLabel();

    if (url) {
        url = `/${language}${url}`;
    }

    return (
        <button className="bg-active rounded-lg p-3 font-bold rounded-full hover:bg-excited w-full" onClick={onClick}>
            {url &&<Link className="w-full block text-content_b" href={url}>{label}</Link>}
            {!url && label}
        </button>
    );
};

export default Button;