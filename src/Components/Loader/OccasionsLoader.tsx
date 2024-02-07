import type { FC } from 'react';

interface OccasionsLoaderProps {}

const OccasionsLoader: FC<OccasionsLoaderProps> = () => {
    return (
        <>
        <div className="w-full">
        <div className="w-full md:px-8 gap-2 grid grid-cols-1 lg:grid-cols-2 animate-pulse ">
            <div className="h-96 bg-gray-100"></div>
            <div className="h-96 bg-gray-100"></div> 
         </div>
        </div>
        </>
    );
}

export default OccasionsLoader;
