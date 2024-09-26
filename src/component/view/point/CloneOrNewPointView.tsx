import Button from "@/component/button/Button";

const CloneOrNewPointView = () => {
    return (
        <div className="flex items-center w-full h-full justify-items-center [family-name:var(--font-geist-sans)]">
            <main className="flex flex-col w-full h-full gap-8 items-center justify-between">
            <div className='flex flex-grow items-center'>
                <h1 className='text-3xl'>Clone or New?</h1>
            </div>
            <footer className='flex flex-col gap-1 w-full p-3'>
                <Button label="New" url="/point/register"/>
                <Button label="Clone" url="/"/>
            </footer>        
            </main>
        </div>
    );
};

export default CloneOrNewPointView;