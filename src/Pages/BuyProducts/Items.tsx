import { useContext, type FC, useEffect, useState } from 'react';
import { DataContext } from '../../Context/DataProvider';
import { BsStarHalf } from 'react-icons/bs';
import Http from '../../Services/Http';
import { toast } from 'react-toastify';
import { BiRupee } from 'react-icons/bi';

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
                data: { _id: JSON.parse(sessionStorage.getItem('product_id') ?? '{}') }
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
          <div className="w-full gap-2 pt-3 grid grid-cols-1 xl:grid-cols-2 ">
                {products?.map((e: any) => (
                  <div key={e?._id} className="md:h-40 p-2 text-gray-800 relative bg-white border flex flex-col md:flex-row justify-between">
                    <div  className="flex gap-2 md:gap-4 group">
                      <img className='h-20 md:h-full rounded-md' src={process.env.REACT_APP_API_URL + '/' + e?.product?.images[0]?.url} alt="" />
                      <div className='flex flex-col justify-between'>
                        <div className='flex flex-col gap-2 md:gap-5'>
                          <p className='text-sm md:text-lg truncate group-hover:underline'>{e?.product?.name}</p>
                          <p className=' truncate text-sm'><span className='text-gray-500'>Flavour : </span><span className="bg-gray-100 rounded-md p-1 text-gray-700 font-medium text-xs">{e?.product?.category.name}</span></p>
                          <div className='flex gap-2'>
                        <div className="bg-blue-500 rounded-md w-14 px-2.5 text-sm text-white flex items-center gap-1">4.3 <BsStarHalf className='text-xs' /></div>
                          <span className='text-gray-600 text-sm'>(3434)</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <span className='flex items-center text-lg text-blue-500'><BiRupee className='text-md' />{e?.product?.discounts ? Math.ceil((100 - e?.product?.discounts) / 100 * e?.product?.price) * e?.count : e?.product?.price * e?.count}</span>
                          {e?.product?.discounts ?
                            <>
                              <del className='flex items-center text-sm text-gray-400'><BiRupee className='text-base' />{e?.product?.price * e?.count}</del>
                              <span className='text-green-500 text-sm font-medium'>{e?.product?.discounts}% off</span>
                            </> : ''}
                        </div>
                      </div>
                    </div>
                    <div className="flex absolute right-2 bottom-2  bg-gray-100 px-1 py-1 rounded-md">
                      <button className='text-sm'>Qty :</button>
                      <select value={e?.count} onChange={(el) => ItemCount(e?._id, el.target.value)} className='outline-none text-sm bg-transparent'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
        </>
    );
}

export default Items;
