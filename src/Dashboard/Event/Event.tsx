import { useContext, type FC } from 'react';
import {BiPlus} from 'react-icons/bi'
import { DataContext } from '../../Context/DataProvider';
import PopUp from '../../Components/PopUp';

interface EventProps { }

const Event: FC<EventProps> = () => {
    const {setOpenPopUP} = useContext(DataContext)
    return (
        <>
            <div className="px-4 relative w-full h-full">
                <div onClick={() => setOpenPopUP(true)} className='w-14 h-14 flex items-center cursor-pointer justify-center rounded-full border-2 fixed bottom-6 right-6'>
                    <BiPlus className='text-3xl text-gray-600' />
                </div>
            </div>
            <PopUp title='Create Event' />
        </>
    );
}

export default Event;
