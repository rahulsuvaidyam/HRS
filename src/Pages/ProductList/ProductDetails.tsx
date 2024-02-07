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
    // eslint-disable-next-line
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
            <div className="pt-12 md:pt-14 w-full h-full max-w-[1060px] mx-auto relative">
                {loading ? <Spinner loading={loading} /> :
                    <div className="flex flex-col gap-x-5 md:flex-row h-full ">
                        <div className="w-full md:w-1/2 md:h-full md:p-2">
                            <div className="hidden md:block ">
                                <div className="w-full h-auto md:h-full flex gap-2">
                                    <div className="w-20 h-full flex flex-col gap-1">
                                        {products.images?.map((e: any) => (
                                            <div key={e._id} onClick={() => setimageSelected(e)} className={`${imageSelected?._id === e?._id ? 'border-2 border-gray-950' : ''} px-0.5 md:px-0 overflow-hidden cursor-pointer`}>
                                                <img className='h-full md:h-auto w-auto md:w-full' src={e?.url} alt="" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full h-full flex flex-col gap-3">
                                        <img className='w-full' src={(imageSelected?.url === undefined ? products?.image?.url : imageSelected?.url)} alt="" />
                                        <div className="hidden md:block">
                                            <div className="w-full items-center flex gap-4 left-0 px-2 md:px-0 ">
                                                <button onClick={() => CartItem(products._id)} className='uppercase w-full font-medium h-[45px] text-white bg-primary'>Add to Cart</button>
                                                <button onClick={() => wishlist(products._id)} className='uppercase w-full font-medium h-[45px] text-white bg-secondary'>Buy Now</button>
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
                                            <img className='h-56' src={e?.url} alt='aa' />
                                        </div>
                                    ))}
                                </Carousel>
                            </div>

                        </div>
                        <div className="w-full md:w-1/2 h-full md:overflow-y-scroll md:scrollbar-none  p-2 pb-14 md:pb-0 flex flex-col gap-2 relative">
                            <p className='text-xl'>{products.name}</p>
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
                           <div className="flex items-center gap-2">
                            <p className="font-light text-sm">Fresh Cake & delicious</p>
                           </div>
                            <div className="">
                                <p className='font-bold'>Weight</p>
                                <div className="flex gap-2">
                                    <div className="px-2 h-10 rounded-lg border flex items-center justify-center text-sm">1 Kg</div>
                                    <div className="px-2 h-10 rounded-lg border flex items-center justify-center text-sm">1.5 Kg</div>
                                </div>
                            </div>
                            {/* sds */}
                            <div className="w-full">
                                <p className='text-lg font-medium to-gray-700'>Description</p>
                                <p className='text-sm '>{products?.description.substring(0, 200)}{products?.description.length > 200 && '...'}</p>
                            </div>
                            <div className="w-full">
                                <p className='font-medium to-gray-700'>Product Deatils</p>
                                 <div className='text-xs list-disc pl-6' dangerouslySetInnerHTML={{ __html: products.key_features }}/>
                            </div>
                            <div className="w-full ">
                                <p className=' font-medium text-tatary text-sm'>Seller : {products?.created_by?.name}</p>
                            </div>
                            <div className="block md:hidden">
                                <div className="w-full bg-white fixed md:sticky bottom-0 h-14 items-center flex gap-4 left-0 px-2 md:px-0 z-10">
                                    <button onClick={() => CartItem(products._id)} className='uppercase w-full font-medium h-10 text-white bg-primary'>Add to Cart</button>
                                    <button onClick={() => wishlist(products._id)} className='uppercase w-full font-medium h-10 text-white bg-secondary'>Buy Now</button>
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
