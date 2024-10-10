import { getTranslationFn } from "@/i18n/Translations";
//import { getTranslationFn } from "@/i18n/LocalizationProvider";
import { NextResponse } from "next/server";


export async function GET() {
  const t = getTranslationFn("ru"); 
  return NextResponse.json({ message: t("BOT_START_DESCRIPTION") }, { status: 200 });

}

