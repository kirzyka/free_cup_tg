"use client";

import Button from "@/component/button/Button";
import { useLocale } from "@/hooks/useLocale";
import Point from "@/types/Point";

interface Props {
    point: Point;
    description: string;
    onDelete: () => void;
    onClose: () => void;
};

const DeletePointView = ({point, description, onDelete, onClose}: Props) => {
    const {t} = useLocale();

    return (
        <div className="flex items-center justify-center absolute w-full h-full backdrop-blur bg-transparent-400">
            <div className="flex flex-col items-center justify-center w-full m-4 px-8 py-4 bg-content_b rounded-xl shadow-2xl">
                <div className="flex flex-col gap-3 mb-5 w-full">
                    <h1 className="text-3xl">{t('SCR_DELETE_POINT_HEADER')}</h1>
                    <p className="text-2xl">[{point.name}]</p>
                </div>
                <div className="w-full mb-5">
                    <p>{description}</p>
                </div>
                <div className="flex flex-col gap-3 w-full ">
                    <Button label={t('CMN_DELETE')} type="danger" onClick={onDelete} />
                    <Button label={t('CMN_CLOSE')} onClick={onClose} />
                </div>
            </div>
        </div>
    );
};

export default DeletePointView;