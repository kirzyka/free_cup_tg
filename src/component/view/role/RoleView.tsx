"use client";

import Button from "@/component/button/Button";
import { useLabel } from "@/hooks/useLabel";

const RoleView = () => {
    const {t} = useLabel();

    return (
        <div className="flex items-center w-full h-full justify-items-center [family-name:var(--font-geist-sans)]">
            <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
            <div className='flex flex-grow items-center'>
                <h1 className='text-3xl'>
                    {t('SCR_ROLE_HEADER')}
                </h1>
            </div>
            <footer className='flex flex-col gap-1 w-full p-3'>
                <Button label={t("SCR_ROLE_LBL_CLIENT")} url="/point/add"/>
                <Button label={t('SCR_ROLE_LBL_BARISTA')} url="/point/clone-or-new"/>
            </footer>        
            </main>
        </div>
    );
};

export default RoleView;