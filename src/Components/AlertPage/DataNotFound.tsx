import type { FC } from 'react';

interface DataNotFoundProps {}

const DataNotFound: FC<DataNotFoundProps> = () => {
    return (
        <>
         <div className="w-full h-full text-gray-700 flex items-center justify-center">
            <p className='text-2xl'>Data Not Found !</p>
         </div>
        </>
    );
}

export default DataNotFound;
