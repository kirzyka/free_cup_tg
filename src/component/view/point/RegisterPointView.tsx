"use client";

import Button from "@/component/button/Button";
import Rating from "@/component/rating/Rating";
import { AppContext } from "@/context/AppContextProvider";
import { useLocale } from "@/hooks/useLocale";
import Point from "@/types/Point";
import { Role } from "@/types/Role";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const DISCOUNT: Record<number, number> = {
    2: 33,
    3: 25,
    4: 20,
    5: 17,
    6: 14,
    7: 12,
    8: 11,
    9: 10,
    10: 9,
};

const RegisterPointView = () => {
    const {t} = useLocale();
    const router = useRouter();
    const { points, setPoints } = useContext(AppContext);
    const [coffeePointName, setCoffeePointName] = useState('');
    const [requiredCups, setRequiredCups] = useState(7);
    const [iconSize, setIconSize] = useState<number>(30);
    const calcIconSize = (width: number) => (width - 28) / 10
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setCoffeePointName(e.target.value);
    const handleChangeCups = useCallback(
        (value: number) => {
            if (value < 3) {
            return setRequiredCups(2);
            }
            setRequiredCups(value);
        },
        []
    );
    const handleRegister = () => {
        const name: string = coffeePointName.trim();
        const point: Point | undefined = points.find((p) => p.name === name);

        if (point) {
            //navigation.replace(Screens.Main);
            return;
        }
    
        const newPoint: Point = {
            key: uuidv4().toString().substring(0, 8),
            name,
            role: Role.BARISTA,
            requiredCups: Number(requiredCups),
            accessKey: uuidv4().toString().substring(0, 8),
        };

        //await addPointCommand(db, newPoint);

        setPoints([...points, { ...newPoint }]);
        //navigation.replace(Screens.Main);
    };

    useEffect(() => {
          setIconSize(calcIconSize(window.innerWidth));
          const handleResize = () => {
            setIconSize(calcIconSize(window.innerWidth));
          };
          window.addEventListener('resize', handleResize);

          return () => {
            window.removeEventListener('resize', handleResize);
          };
      }, []); 

    console.log("Points", points);

    return (
        <div className="flex items-center w-full h-full justify-items-center [family-name:var(--font-geist-sans)]">
            <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
                <div className='flex flex-col items-center w-full p-3 justify-end min-h-[150px]'>
                    <h1 className='text-3xl'>{t("SCR_REG_POINT_HEADER")}</h1>
                </div>
                <div className='flex flex-col flex-grow items-center w-full p-3'>
                    <div className="flex flex-col gap-3 w-full ">
                        <label className="block text-2xl font-bold mb-2">{t("SCR_REG_POINT_LBL_NAME")}</label>
                        <input className='w-full p-3 bg-transparent border-dashed border-2 focus:outline-none'
                            type="text" 
                            name="name" 
                            placeholder="Latte Love" 
                            maxLength={40}
                            value={coffeePointName}
                            onChange={handleChangeName}
                        />
                        <label className="block text-2xl font-bold mb-2">{t("SCR_REG_POINT_LBL_CUPS_COUNT")}</label>
                        <Rating 
                            size={iconSize}
                            value={requiredCups}
                            count={10}
                            activeImage="/images/cup_c.png"
                            inactiveImage="/images/cup_w.png"
                            onChange={handleChangeCups}
                        />
                        <p>
                            {t('SCR_REG_POINT_LBL_CUPS_COUNT_DESCR', {
                                cups: requiredCups.toLocaleString(),
                            })}
                        </p>
                        <p>
                            {t('SCR_REG_POINT_LBL_DISCOUNT_DESCR', {
                                discount: DISCOUNT[requiredCups].toLocaleString(),
                            })}
                        </p>
                    </div>
                </div>
                <footer className='flex flex-col gap-1 w-full p-3'>
                    <Button 
                        label={t('SCR_REG_POINT_BTN_REGISTER')}
                        disabled={!coffeePointName || !requiredCups}
                        onClick={handleRegister}
                    />
                    <Button label={t('CMN_BACK')} onClick={() => router.back()}/>
                </footer>        
            </main>
        </div>
    );
};

export default RegisterPointView;