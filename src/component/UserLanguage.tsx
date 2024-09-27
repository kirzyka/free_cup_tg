"use client"

import { useEffect, useState } from "react";

const UserLanguage = () => {
    const [lang, setLang] = useState<string>('ru');

    useEffect(() => {
        setLang(navigator.language || '--');        
    }, []);

    return (
        <>
            {lang}
        </>
    )
};

export default UserLanguage;


