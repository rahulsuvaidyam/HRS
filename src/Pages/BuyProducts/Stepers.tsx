import { type FC } from 'react';
import { MdDone } from 'react-icons/md';

interface StepersProps {
    currentStep:number,
}

const steps = ['Address','Order Summary','Payment']
const Stepers: FC<StepersProps> = ({currentStep}) => {
    return (
        <>
        <div className="w-full fixed top-12 md:top-14 h-14 md:h-16 z-20 bg-gray-50 shadow-md py-2 flex items-center justify-center pt-2">
            {steps?.map((e:string,i:number)=>(
                <div className={`${currentStep ===i+1 && 'active'} ${currentStep > i+1 && 'active'} step-item`} key={i}>
                    <div className='step'>{i+1 < currentStep?<MdDone/>: i+1}</div>
                    <p className='text-xs  font-medium'>{e}</p>
                </div>
            ))}
        </div>
        </>
    );
}

export default Stepers;
