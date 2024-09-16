import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex items-center w-full h-full justify-items-center [family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
        <div className='flex flex-grow items-center'>
          <h1>FreeCup</h1>
        </div>
        <footer className='p-3'>
          <button className="bg-brown-500 text-white rounded-lg px-4 py-2 hover:bg-brown-600">
            <Link href="/coffee-shop/add">Add Caffee Shop</Link>
          </button>
        </footer>        
      </main>
    </div>
  );
}
