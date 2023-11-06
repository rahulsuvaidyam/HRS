import { useState, type FC } from 'react';
import Stepers from './Stepers';

interface BuyProductsProps { }

const BuyProducts: FC<BuyProductsProps> = () => {
    const [currentStep, setcurrentStep] = useState(1)
    const Order = () => {
        setcurrentStep((prev) => prev + 1)
    }
    return (
        <>
            <div className="w-full h-full relative pt-12 md:pt-14 max-w-[1600px] mx-auto">
                <Stepers {...{ currentStep }} />

                <div className="w-full fixed bottom-0 left-0 px-2  md:px-20 bg-slate-50 h-14 flex items-center justify-between">
                    <p>6900</p>
                    <button onClick={() => Order()} className='bg-blue-500 rounded-md md:rounded-none py-2 text-white px-8 md:px-16'>Continue</button>
                </div>
            </div>
        </>
    );
}

export default BuyProducts;
