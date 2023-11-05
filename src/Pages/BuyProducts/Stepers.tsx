import { type FC } from 'react';
import { MdDone } from 'react-icons/md';

interface StepersProps {
    currentStep:number,
}

const steps = ['Address','Order Summary','Payment']
const Stepers: FC<StepersProps> = ({currentStep}) => {
    console.log(currentStep)
    return (
        <>
        <div className="w-full flex items-center justify-center pt-2">
            {steps?.map((e:string,i:number)=>(
                <div className={`${currentStep ===i+1 && 'active'} ${currentStep > i+1 && 'active'} step-item`} key={i}>
                    <div className='step'>{i+1 < currentStep?<MdDone/>: i+1}</div>
                    <p className='font-thin text-sm lg:font-medium'>{e}</p>
                </div>
            ))}
        </div>
        </>
    );
}

export default Stepers;
