import Button from '@/component/button/Button';

export default function Home() {
  return (
    <div className="flex items-center w-full h-full justify-items-center [family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
        <div className='flex flex-grow items-center'>
          <h1>FreeCup</h1>
        </div>
        <footer className='p-3'>
          <Button label="Add Coffee Shop" url="/coffee-shop/add"/>
        </footer>        
      </main>
    </div>
  );
}
