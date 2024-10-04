import ScanView from "@/component/view/scan/ScanView";
import { Action } from "@/types/Action";
//import dynamic from "next/dynamic";

/*
const ScanView = dynamic(() => import("@/component/view/scan/ScanView"), {
    ssr: false,
});
*/
export default function Page() {
    return <ScanView action={Action.ADD_POINT} />;
}
