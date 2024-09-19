import dynamic from 'next/dynamic';
import Link from 'next/link';

const Scaner = dynamic(() => import('../../component/Scaner'), { ssr: false });
//<span className='bg-boroda text-boroda2'>TEST</span>
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Scan</h1>
        <Scaner/>
        <Link href="/">Home</Link>
        <span className='text-type2 p-5'>AAA</span>
      </main>
    </div>
  );
}
