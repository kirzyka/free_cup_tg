//'use client';

import { DEFAULT_LANG } from "@/client_const";
import Link from "next/link";
import { FC } from "react";

interface Props {
    label: string;
    url?: string;
    lang?: string;
    onClick?: () => void;
}

const Button: FC<Props> = ({label, url, lang = DEFAULT_LANG, onClick}: Props) => {
    if (url) {
        url = `/${lang}${url}`;
    }

    return (
        <button className="bg-active rounded-lg p-3 font-bold rounded-full hover:bg-excited w-full" onClick={onClick}>
            {url &&<Link className="w-full block text-content_b" href={url}>{label}</Link>}
            {!url && label}
        </button>
    );
};

export default Button;