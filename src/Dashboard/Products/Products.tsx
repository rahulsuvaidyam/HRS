import { useState, type FC, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdDelete, MdEdit } from 'react-icons/md'
import { BiPlus, BiRupee } from 'react-icons/bi'
import { BsStarHalf } from 'react-icons/bs'
import { DataContext } from '../../Context/DataProvider';
import Http from '../../Services/Http';
import PopUp from '../../Components/PopUp';
import Spinner from '../../Components/Loader/Spinner';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import DataNotFound from '../../Components/AlertPage/DataNotFound';

interface ProductProps { }

const Product: FC<ProductProps> = () => {
    const [product, setProduct] = useState<any>([])
    let [loading, setLoading] = useState<boolean>(true);
    const { setOpenPopUP, setproductEdit ,isRender} = useContext(DataContext)
    //    console.log(category)
    useEffect(() => {
        const getProduct = async () => {
            setLoading(true)
            try {
                const response = await Http({
                    url: '/product',
                    method: 'get',
                });
                setProduct(response?.data?.data)
                setOpenPopUP(false)
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            } catch (error: any) {
                toast.error(error.response?.data?.message)
            }
        }
        getProduct();
        // eslint-disable-next-line
    }, [isRender])
    const edit = (e: any) => {
        setOpenPopUP(true)
        setproductEdit(e)
    }
    const Delete = async (e: any) => {
        setLoading(true)
        try {
            const response = await Http({
                url: '/product',
                method: 'delete',
                data: { _id: e }
            });
            setTimeout(() => {
                setLoading(false)
            }, 1000);
            toast.success(response?.data?.message)
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    }
    return (
        <>
            {loading === true ? <Spinner loading={loading} />
                : <>
                    {product.length >= 1?
                    <div className="w-full h-full px-4 relative">
                    <div className="grid pt-3 grid-cols-2 gap-x-2 md:gap-x-6 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {product?.map((e: any) => (
                            <div key={e?._id} className="border hover:shadow-xl cursor-pointer group rounded-sm relative">
                                <Carousel
                                    showArrows={false}
                                    infiniteLoop={true}
                                    autoPlay={true}
                                    dynamicHeight={true}
                                    showThumbs={false}
                                >
                                    {e?.images?.map((e: any) => (
                                        <div key={e?._id}>
                                            <img className='h-24' src={process.env.REACT_APP_API_URL + '/' + e?.url} alt='aa' />
                                        </div>
                                    ))}

                                </Carousel>
                                <div className="w-full p-1 flex flex-col">
                                    <p className="text-xs truncate">{e?.name}</p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-1">
                                            <span className='flex text-sm items-center'><BiRupee className='text-sm' />{e?.discounts ? Math.ceil((100 - e?.discounts) / 100 * e?.price) : e?.price}</span>
                                            {e?.discounts ? <>
                                                <del className='flex items-center text-xs text-gray-700'><BiRupee className='text-xs' />{e?.price}</del>
                                                <span className='text-primary text-xs '>{e?.discounts}% off</span></>
                                                : ''}
                                        </div>
                                        <div className="bg-primary rounded-sm px-1 text-[10px] text-white flex items-center">4.3 <BsStarHalf className='text-[8px]' /></div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className='text-xs font-medium'>{e?.category?.name}</span>
                                        <div className="text-xs text-tatary">456 Reviews</div>
                                    </div>
                                </div>
                                <div className=" absolute top-2 right-2 hidden group-hover:block">
                                    <div className=" bg-opacity-75 bg-gray-500 rounded-md p-1 flex items-center gap-2 ">
                                        <MdDelete onClick={() => Delete(e._id)} className='text-red-500 text-lg cursor-pointer' />
                                        <MdEdit onClick={() => edit(e)} className='text-yellow-500 text-lg cursor-pointer' />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div onClick={() => setOpenPopUP(true)} className='w-14 h-14 flex items-center cursor-pointer justify-center rounded-full border-2 fixed bottom-6 right-6'>
                        <BiPlus className='text-3xl text-gray-600' />
                    </div>
                </div>:<DataNotFound/>}
                    <PopUp title='Create Product' />
                </>}
        </>
    );
}

export default Product;
