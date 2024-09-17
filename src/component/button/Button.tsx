import Link from "next/link";

interface Props {
    label: string;
    url: string;
}

export default function Button({label, url}: Props) {
    return (
        <button className="bg-brown-500 text-white rounded-lg px-4 py-2 hover:bg-brown-600">
            <Link href={url}>{label}</Link>
        </button>
    );
}