import { useContext, type FC, useEffect, useState } from 'react';
import { DataContext } from '../../Context/DataProvider';
import { BsStarHalf } from 'react-icons/bs';
import Http from '../../Services/Http';
import { toast } from 'react-toastify';
import { BiRupee } from 'react-icons/bi';
import { Discounts, TotalPrice, TotalPriceWithDiscount } from '../../Services/TotalPrice';

interface ItemsProps {
    settotalPrice:any
}

const Items: FC<ItemsProps> = ({settotalPrice}) => {
    const [products, setProducts] = useState([])
    const { isRender, setIsRender } = useContext(DataContext)
    settotalPrice(products)

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
    
    const ItemCount = async (e: any, value: any) => {
        try {
          const response = await Http({
            url: '/cart',
            method: 'put',
            data: { _id: e, value }
          });
          setIsRender(!isRender)
          console.log(response?.data?.message)
        } catch (error: any) {
          toast.error(error.response?.data?.message)
        }
      }
    return (
        <>
          <div className="flex flex-col md:flex-row gap-3 pt-1 md:pt-3 ">
            <div className="w-full md:w-[70%] md:border-x md:border-t h-auto shadow-md md:shadow-none flex flex-col bg-white">
              {products?.map((e: any) => (
                <div key={e?._id} className="lg:h-32 p-3 text-gray-800 relative border-b flex flex-col lg:flex-row justify-between">
                  <div className="flex gap-2 lg:gap-4">
                    <img className='h-20 lg:h-full rounded-md' src={process.env.REACT_APP_API_URL + '/' + e?.product?.images[0]?.url} alt="" />
                    <div className='flex flex-col justify-between'>
                        <div className='flex flex-col gap-1'>
                          <p className='text-sm md:text-base truncate '>{e?.product?.name}</p>
                          <p className=' truncate text-sm'><span className='text-gray-500'>Flavour : </span><span className="bg-gray-100 rounded-md p-1 text-secondary font-medium text-xs">{e?.product?.category.name}</span></p>
                          <div className='flex gap-2'>
                        <div className="bg-primary rounded-sm px-2 text-sm text-white flex items-center gap-1">4.3 <BsStarHalf className='text-xs' /></div>
                          <span className='text-tatary text-sm'>(3434)</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <span className='flex items-center text-lg text-primary'><BiRupee className='text-md' />{e?.product?.discounts ? Math.ceil((100 - e?.product?.discounts) / 100 * e?.product?.price) * e?.count : e?.product?.price * e?.count}</span>
                          {e?.product?.discounts ?
                            <>
                              <del className='flex items-center text-sm text-gray-400'><BiRupee className='text-base' />{e?.product?.price * e?.count}</del>
                              <span className='text-green-500 text-sm font-medium'>{e?.product?.discounts}% off</span>
                            </> : ''}
                        </div>
                      </div>
                  </div>
                  <div className="flex absolute right-2 bottom-2  bg-gray-100 px-1 py-0.5 rounded-sm">
                      <button className='text-sm cursor-text'>Qty :</button>
                      <select value={e?.count} onChange={(el) => ItemCount(e?._id, el.target.value)} className='outline-none cursor-pointer text-sm bg-transparent'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                </div>
              ))}
            </div>
            <div className="w-full md:w-[30%]">
               <div className="md:border bg-white h-auto shadow-md md:shadow-none">
               <p  className='text-lg text-gray-600 h-12 border-b flex items-center px-4'>PRICE DETAILS</p>
                <div className="flex flex-col gap-5 p-4 border-b">
                  <p className=' flex justify-between items-center'>Price <span className='flex items-center'><BiRupee className='text-base' />{TotalPrice(products)}</span></p>
                  <p className=' flex justify-between items-center'>Discounts <span className='flex items-center text-primary'>-<BiRupee className='text-base' />{Discounts(products)}</span></p>
                  <p className=' flex justify-between items-center'>Delevery Charge <del className='flex items-center text-gray-500'><BiRupee className='text-base' />40</del></p>
                </div>
                <p className=' flex justify-between px-4 py-2 font-medium'>Tolal Price <span className='flex items-center'><BiRupee className='text-base' />{TotalPriceWithDiscount(products)}</span></p>
               </div>
            </div>
            </div>
       
        </>
    );
}

export default Items;
