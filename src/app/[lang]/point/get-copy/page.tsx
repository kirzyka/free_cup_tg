import ScanView from "@/component/view/scan/ScanView";
import { Action } from "@/types/Action";

export default function Page() {
    return <ScanView action={Action.CLONE_POINT} />;
}
