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
    const { isRender, setIsRender,setLogInPage } = useContext(DataContext)
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
                }, 2000);
            }

        } catch (error: any) {
            toast.error(error.response?.data?.message)
            setLogInPage(true)
        }
    }
    const wishlist = async (e: any) => {
      console.log(e)
    }
    return (
        <>
            <div className="pt-12 md:pt-14 pb-3 w-full h-full max-w-[1060px] mx-auto relative">
                {loading ? <Spinner loading={loading} /> :
                    <div className="flex flex-col md:flex-row pb-2 h-full ">
                        <div className="w-full md:w-1/2 md:h-full md:p-2">
                            <div className="hidden md:block ">
                                <div className="w-full h-auto md:h-full flex gap-2">
                                    <div className="w-20 h-full border-r flex flex-col gap-1">
                                        {products.images?.map((e: any) => (
                                            <div key={e._id} onClick={() => setimageSelected(e)} className={`${imageSelected?._id === e?._id ? 'border-2 border-gray-950' : ''} px-0.5 md:px-0 overflow-hidden cursor-pointer`}>
                                                <img className='h-full md:h-auto w-auto md:w-full' src={process.env.REACT_APP_API_URL + '/' + e?.url} alt="" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full h-full flex flex-col gap-3">
                                        <img className='w-full' src={process.env.REACT_APP_API_URL + '/' + (imageSelected?.url === undefined ? products?.image?.url : imageSelected?.url)} alt="" />
                                        <div className="hidden md:block">
                                            <div className="w-full items-center flex gap-4 left-0 px-2 md:px-0 ">
                                                <button onClick={() => CartItem(products._id)} className='uppercase w-full font-medium h-[45px] text-white bg-primary'>Add to Cart</button>
                                                <button onClick={() => wishlist(products._id)} className='uppercase w-full font-medium h-[45px] text-white bg-secondary'>Wish list</button>
                                            </div>
                                        </div>
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
                        <div className="w-full md:w-1/2 h-full  p-2 pb-14 md:pb-0 flex flex-col gap-2 relative">
                            <p className='text-lg '>{products.name}</p>
                            <div className="flex items-center gap-2">
                                <div className="bg-primary px-1 font-medium rounded-sm text-sm text-white flex items-center gap-1">4.3 <BsStarHalf className='text-xs' /></div>
                                <div className="text-xs  text-primary font-normal">456 Reviews</div>
                            </div>
                            <div className="flex items-center gap-2 ">
                                <span className='flex text-3xl font-normal text-secondary'><BiRupee className='pt-1' />{products?.discounts ? Math.ceil((100 - products?.discounts) / 100 * products?.price) : products?.price}</span>
                                {products?.discounts ?
                                    <>
                                        <del className='flex items-center text-base text-tatary'><BiRupee className='text-base' />{products?.price}</del>
                                        <span className='text-primary font-medium'>{products?.discounts}% off</span>
                                    </> : ''}
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-green-500 flex items-center justify-center">
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                100% vegetarian
                            </div>
                            <div className="flex items-center gap-3">
                                <div className={`border-2 text-sm ${weight === 1 ? 'border-orange-500 text-primary' : 'border-gray-500 text-tatary'} w-16 rounded-full h-16 cursor-pointer flex flex-col items-center justify-center `}>
                                    1Kg
                                    <p className='flex items-center'><BiRupee className='text-md' />{products?.price}</p>
                                </div>
                                <div className={`border-2 text-sm ${weight === 2 ? 'border-orange-500 text-primary' : 'border-gray-500 text-tatary'} w-16 rounded-full h-16 cursor-pointer flex flex-col items-center justify-center `}>
                                    2Kg
                                    <p className='flex items-center'><BiRupee className='text-md' />{products?.price*2}</p>
                                </div>
                                <div className={`border-2 text-sm ${weight === 2 ? 'border-orange-500 text-primary' : 'border-gray-500 text-tatary'} w-16 rounded-full h-16 cursor-pointer flex flex-col items-center justify-center `}>
                                    3Kg
                                    <p className='flex items-center'><BiRupee className='text-md' />{products?.price*3}</p>
                                </div>
                            </div>
                            {/* sds */}
                            <div className="flex gap-3">
                                <input type="number" className='outline-none border w-1/2 px-2 py-2 rounded-md' placeholder='Enter delivery pin code' />
                                <input type="date" className='outline-none border w-1/2 px-2 py-2 rounded-md' placeholder='Enter delivery pin code' />
                            </div>
                            <div className="flex gap-3">
                                <input type="text" className='outline-none border w-full px-2 py-2 rounded-md' placeholder='Enter message on cake' />
                            </div>
                            {/* sds */}
                            <div className="w-full">
                                <p className='text-lg font-medium to-gray-700'>Description</p>
                                <p className='text-sm '>{products?.description.substring(0, 200)}{products?.description.length > 200 && '...'}</p>
                            </div>
                            <div className="w-full">
                                <p className='font-medium to-gray-700'>Product Deatils</p>
                                <ul className=' flex flex-col gap-2 list-disc px-4'>
                                    <li className='text-sm '>4 GB RAM | 128 GB ROM | Expandable Upto 1 TB</li>
                                    <li className='text-sm '>4 GB RAM | 128 GB ROM | Expandable Upto 1 TB</li>
                                    <li className='text-sm '>4 GB RAM | 128 GB ROM | Expandable Upto 1 TB</li>
                                    <li className='text-sm '>4 GB RAM | 128 GB ROM | Expandable Upto 1 TB</li>
                                </ul>
                            </div>
                            <div className="w-full ">
                                <p className=' font-medium text-tatary text-sm'>Seller : {products?.created_by?.name}</p>
                            </div>
                            <div className="block md:hidden">
                                <div className="w-full bg-white fixed md:sticky bottom-0 h-14 items-center flex gap-4 left-0 px-2 md:px-0 z-10">
                                    <button onClick={() => CartItem(products._id)} className='uppercase w-full font-medium h-10 text-white bg-primary'>Add to Cart</button>
                                    <button onClick={() => wishlist(products._id)} className='uppercase w-full font-medium h-10 text-white bg-secondary'>Wish list</button>
                                </div>
                            </div>
                        </div>
                    </div>}
                {/* <div className="w-full h-24 bg-red-600">dd</div> */}
            </div>
        </>
    );
}

export default ProductDetails;
