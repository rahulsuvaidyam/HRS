import { useEffect, type FC, useContext, useState } from 'react';
import { BiRupee } from 'react-icons/bi';
import { Discounts, TotalPrice, TotalPriceWithDiscount } from '../../Services/TotalPrice';
import Http from '../../Services/Http';
import { toast } from 'react-toastify';
import { DataContext } from '../../Context/DataProvider';

interface PaymentsProps { }

const Payments: FC<PaymentsProps> = () => {
    const [products, setProducts] = useState([])
    const { isRender, setIsRender } = useContext(DataContext)

    useEffect(() => {
        const GetCarts = async () => {
            try {
      
              const response = await Http({
                url: '/carttobuy',
                method: 'get',
                data: { _id: JSON.parse(sessionStorage.getItem('product_id') ?? '[]') }
              });
              setProducts(response?.data?.data)
              // setLoading(false)
            } catch (error: any) {
              toast.error(error.response?.data?.message)
            }
      
          }
          GetCarts()
    }, [isRender])
    return (
        <>
            <div className="w-full  max-w-[1200px] mx-auto h-full">
                <div className="flex flex-col md:flex-row w-full h-full px-2 bg-white gap-3 pt-4">
                    <div className="w-full md:w-[70%] h-full shadow-md"></div>
                    <div className="w-full md:w-[30%] pb-2 md:pb-0 md:h-full">
                        <div className="md:border bg-white h-auto shadow-md md:shadow-none">
                            <p className='text-lg text-gray-600 h-12 border-b flex items-center px-4'>PRICE DETAILS</p>
                            <div className="flex flex-col gap-5 p-4 border-b">
                                <p className=' flex justify-between items-center'>Price <span className='flex items-center'><BiRupee className='text-base' />{TotalPrice(products)}</span></p>
                                <p className=' flex justify-between items-center'>Discounts <span className='flex items-center text-primary'>-<BiRupee className='text-base' />{Discounts(products)}</span></p>
                                <p className=' flex justify-between items-center'>Delevery Charge <del className='flex items-center text-gray-500'><BiRupee className='text-base' />40</del></p>
                            </div>
                            <p className=' flex justify-between px-4 py-2 font-medium'>Tolal Price <span className='flex items-center'><BiRupee className='text-base' />{TotalPriceWithDiscount(products)}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Payments;
