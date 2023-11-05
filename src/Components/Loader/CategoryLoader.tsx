import type { FC } from 'react';

interface CategoryLoaderProps { }
const data = [1,2,3,4,5,6,7,8,9,10]
const CategoryLoader: FC<CategoryLoaderProps> = () => {
    return (
        <>
            <div className="w-full">
                <div className="w-full flex gap-3">
                    {data?.map((e:any)=>(
                        <div key={e} className="flex flex-col items-center gap-2">
                        <div className="md:w-32 bg-gray-100 w-16 md:h-32 h-16 rounded-full md:rounded-3xl border-2 md:border-0"></div>
                        <div className="md:w-32 bg-gray-100 w-16 h-5 rounded-md"></div>
                    </div>
                    ))}
                   
                </div>
            </div>
        </>
    );
}

export default CategoryLoader;
