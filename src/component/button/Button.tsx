"use client";

import { useLocale } from "@/hooks/useLocale";
import Link from "next/link";
import { FC } from "react";

interface Props {
    label: string;
    url?: string;
    onClick?: () => void;
}

const Button: FC<Props> = ({label, url, onClick}: Props) => {
    const {language} = useLocale();

    if (url) {
        url = `/${language}${url}`;
    }

    return (
        <button className="bg-active p-3 font-bold rounded-[50px] hover:bg-excited w-full" onClick={onClick}>
            {url &&<Link className="w-full block text-content_b" href={url}>{label}</Link>}
            {!url && label}
        </button>
    );
};

export default Button;