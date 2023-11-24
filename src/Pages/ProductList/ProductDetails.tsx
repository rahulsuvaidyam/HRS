import { useState, type FC, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Http from '../../Services/Http';
import { toast } from 'react-toastify';
import { BsStarHalf } from 'react-icons/bs'
import { BiRupee } from 'react-icons/bi';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Spinner from '../../Components/Loader/Spinner';
import { DataContext } from '../../Context/DataProvider';

interface ProductDetailsProps { }

const ProductDetails: FC<ProductDetailsProps> = () => {

    const [products, setProduct] = useState<any>({})
    const [weight, setWeight] = useState<any>(1)
    const [imageSelected, setimageSelected] = useState<any>({})
    let [loading, setLoading] = useState<boolean>(true);
    const { isRender, setIsRender } = useContext(DataContext)
    const { product } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await Http({
                    url: '/productdetails',
                    method: 'get',
                    data: { _id: product }
                });
                // toast.success(response?.data?.message)
                setProduct({ ...response?.data?.data, image: response?.data?.data.images[0] })
                setimageSelected(response?.data?.data.images[0])
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            } catch (error: any) {
                toast.error(error.response?.data?.message)
            }
        }
        getProducts();
        // eslint-disable-next-line
    }, [])

    const CartItem = async (item: any) => {
        try {

            const response = await Http({
                url: '/cart',
                method: 'post',
                data: { product: item }
            });
            if (response?.data?.message === 'Request Successful') {
                navigate('/cart')
            } else {
                toast.success(response?.data?.message)
                setIsRender(!isRender)
                setTimeout(() => {
                    navigate('/cart')
                }, 5000);
            }

        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    }
    const BuyNow = async (e: any) => {
        // sessionStorage.setItem('product_id',JSON.stringify([e]))
        try {

            const response = await Http({
                url: '/cart',
                method: 'post',
                data: { product: e }
            });
            if (response?.data?.message === 'Request Successful') {
                // navigate('/cart')
                navigate('/buy')
            } else {
                toast.success(response?.data?.message)
                setIsRender(!isRender)
                setTimeout(() => {
                    navigate('/buy')
                    // navigate('/cart')
                }, 100);
            }

        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    }
    return (
        <>
            <div className="pt-12 md:pt-14 pb-3 w-full h-full max-w-[1200px] mx-auto">
                {loading ? <Spinner loading={loading} /> :
                    <div className="flex flex-col md:flex-row w-full h-full md:pt-4">
                        <div className="w-full md:w-1/2 lg:w-2/5 md:h-full md:p-2">
                            <div className="hidden md:block">
                                <div className="w-full h-auto md:h-full border-2 flex relative">
                                    <div className="w-16 h-full border-r  flex flex-col">
                                        {products.images?.map((e: any) => (
                                            <div key={e._id} onClick={() => setimageSelected(e)} className={`${imageSelected?._id === e?._id ? 'border border-blue-600' : ''} border-t px-0.5 md:px-0 border-b cursor-pointer`}>
                                                <img className='h-full md:h-auto w-auto md:w-full' src={process.env.REACT_APP_API_URL + '/' + e?.url} alt="" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full h-full">
                                        <img className='w-full h-full p-1' src={process.env.REACT_APP_API_URL + '/' + (imageSelected?.url === undefined ? products?.image?.url : imageSelected?.url)} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="block md:hidden">
                                <Carousel
                                    showArrows={false}
                                    infiniteLoop={true}
                                    autoPlay={true}
                                    dynamicHeight={true}
                                    showThumbs={false}
                                >
                                    {products?.images?.map((e: any) => (
                                        <div key={e?._id}>
                                            <img className='h-56' src={process.env.REACT_APP_API_URL + '/' + e?.url} alt='aa' />
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-3/5 p-2 flex flex-col gap-1 relative pb-12">
                            <p className='text-xl'>{products.name}</p>
                            <div className="flex items-center gap-2">
                                <div className="bg-blue-500 px-1 rounded-sm text-sm text-white flex items-center gap-1">4.3 <BsStarHalf className='text-xs' /></div>
                                <div className="text-sm text-gray-700 font-medium">456 Reviews</div>
                            </div>
                            <div className="flex items-center gap-2 ">
                                <span className='flex items-center text-3xl'><BiRupee className='text-md' />{products?.discounts ? Math.ceil((100 - products?.discounts) / 100 * products?.price) : products?.price}</span>
                                {products?.discounts ?
                                    <>
                                        <del className='flex items-center text-base text-gray-700'><BiRupee className='text-base' />{products?.price}</del>
                                        <span className='text-blue-500 font-medium'>{products?.discounts}% off</span>
                                    </> : ''}
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col ">
                                    <div className={`border-2 ${weight === 1 ? 'border-blue-500 text-blue-500' : 'border-gray-500 text-gray-700'} w-16 rounded-md h-10 cursor-pointer flex items-center justify-center `}>
                                        1Kg
                                    </div>
                                    <p className='flex items-center'><BiRupee className='text-md' />{products?.price}</p>
                                </div>
                                <div className="flex flex-col ">
                                    <div className={`border-2 ${weight === 2 ? 'border-blue-500 text-blue-500' : 'border-gray-500 text-gray-700'} w-16 rounded-md h-10 cursor-pointer flex items-center justify-center `}>
                                        2Kg
                                    </div>
                                    <p className='flex items-center'><BiRupee className='text-md' />{products?.price*2}</p>
                                </div>
                            </div>
                            <div className="w-full">
                                <p className='text-xl font-medium to-gray-500'>Product Description</p>
                                <p>{products?.description}</p>
                            </div>
                            <div className="w-full truncate">
                                <p className=' font-medium to-gray-400'>Seller : {products?.created_by?.name}</p>
                            </div>
                            <div className="w-full fixed md:sticky bottom-2 flex gap-4 left-0 px-2">
                                <button onClick={() => CartItem(products._id)} className='uppercase w-full  py-2 text-white rounded-md bg-blue-500'>Add to Cart</button>
                                <button onClick={() => BuyNow(products._id)} className='uppercase w-full  py-2 text-white rounded-md bg-blue-500'>Buy Now</button>
                            </div>
                        </div>
                    </div>}
            </div>
        </>
    );
}

export default ProductDetails;
