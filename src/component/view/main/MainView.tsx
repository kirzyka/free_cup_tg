import Button from "@/component/button/Button";

const MainView = () => {
    return (
        <div className="flex items-center w-full h-full justify-items-center [family-name:var(--font-geist-sans)]">
        <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
          <div className='flex flex-grow items-center'>
            <h1 className='text-3xl'>FreeCup  <span className="text-xs">v 0.0.5</span></h1>            
          </div>
          <footer className='w-full p-3'>
            <Button label="Add Coffee Shop" url="/role"/>
          </footer>        
        </main>
      </div>
    );
};  


export default MainView;