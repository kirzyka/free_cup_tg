import dynamic from 'next/dynamic';

const ScanView = dynamic(() => import('@/component/view/scan/ScanView'), { ssr: false });

export default function Page() {
    return (
      <ScanView type="clone"/>
    );
}