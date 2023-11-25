import { useEffect, type FC, useState } from 'react';
import Http from '../../Services/Http';
import { toast } from 'react-toastify';
import { BiRupee } from 'react-icons/bi';
import { BsStarHalf } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Occasion from '../Occasion/Occasion';

interface ProductGroupByEventProps { }

const ProductGroupByEvent: FC<ProductGroupByEventProps> = () => {

    const [product, setProduct] = useState<any>([])

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await Http({
                    url: '/GetShowGrop',
                    method: 'get',
                },true);
                setProduct(response?.data?.data)
                setTimeout(() => {
                    //   setLoading(false)
                }, 1000);

            } catch (error: any) {
                toast.error(error.response?.data?.message)
            }
            
        }
        getProducts();
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className="w-full md:px-8 flex flex-col gap-5">
                <Occasion/>
                {product?.map((e: any) => (
                    <div key={e?.event?._id} className="bg-white md:rounded-sm shadow-md p-3">
                        <p className='text-2xl font-medium '>{e?.event?.name} <span className='text-lg'>({e?.products.length})</span></p>
                        <div className="pt-3 overflow-x-auto scrollbar-thin flex gap-2 md:gap-3">
                            {e?.products?.map((e: any) => (
                                <Link to={'/productdetails/'+e._id} key={e._id} className="border w-1/5 min-w-[200px]  md:min-w-[220px] hover:shadow-xl cursor-pointer rounded-sm bg-white">
                                    <div className="w-full overflow-hidden rounded-t-sm">
                                    <img className='rounded-t-sm max-h-44 w-full transition-all duration-200 hover:scale-105' src={process.env.REACT_APP_API_URL + '/' + e?.images[0]?.url} alt="" />
                                    </div>
                                    <div className="w-full p-1 flex flex-col gap-2">
                                        <p className="text-sm truncate">{e?.name}</p>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-1">
                                                <span className='flex items-center'><BiRupee className='text-lg' />{e?.discounts ? Math.ceil((100 - e?.discounts) / 100 * e?.price) : e?.price}</span>
                                                {e?.discounts ? <>
                                                    <del className='flex items-center text-sm text-gray-700'><BiRupee className='text-md' />{e?.price}</del>
                                                    <span className='text-primary text-sm font-medium'>{e?.discounts}% off</span></>
                                                    : ''}
                                            </div>
                                            <div className="bg-primary rounded-sm px-1 text-sm text-white flex items-center gap-1">4.3 <BsStarHalf className='text-xs' /></div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className='text-xs font-medium'>{e?.category}</span>
                                            <div className="text-xs text-gray-500">456 Reviews</div>
                                        </div>
                                    </div>
                                </Link>

                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ProductGroupByEvent;
