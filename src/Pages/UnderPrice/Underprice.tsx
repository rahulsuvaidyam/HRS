import type { FC } from 'react';

interface UnderPriceProps {}
const data = [
    {
        _id:1,
        price:499
    },
    {
        _id:2,
        price:999
    },
    {
        _id:3,
        price:1499
    }
]
const UnderPrice: FC<UnderPriceProps> = () => {
    return (
        <>
          <div className="w-full md:px-8 pt-5">
            <div className="bg-white md:rounded-sm shadow-md p-3">
                <p className='text-2xl font-medium '>Budget Buys</p>
                <div className="flex gap-6 pt-3 h-32 md:h-44 items-center overflow-x-auto scrollbar-thin">
                    {data?.map((e:any)=>(
                        <div key={e._id} className="flex text-gray-700 truncate cursor-pointer min-w-[220px] w-1/3 items-center gap-3">
                            <p className='text-4xl'>Under</p>
                           <p className="text-4xl"> {e.price} /-</p>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </>
    );
}

export default UnderPrice;
