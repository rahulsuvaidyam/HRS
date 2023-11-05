import { useState, type FC, useContext, useEffect } from 'react';
import PopUp from '../../Components/PopUp';
import { BiPlus } from 'react-icons/bi';
import { MdDelete, MdEdit } from 'react-icons/md';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Spinner from '../../Components/Loader/Spinner';
import Http from '../../Services/Http';
import { toast } from 'react-toastify';
import { DataContext } from '../../Context/DataProvider';
import DataNotFound from '../../Components/AlertPage/DataNotFound';

interface CarouselsProps {}


const Carousels: FC<CarouselsProps> = () => {
    const [carousel, setcarousel] = useState([])
    let [loading, setLoading] = useState<boolean>(true);
    const { setOpenPopUP, setcarouselEdit ,isRender} = useContext(DataContext)

    useEffect(() => {
        const getCategory = async () => {
            setLoading(false)
            try {
                const response = await Http({
                    url: '/carousel',
                    method: 'get',
                });
                // toast.success(response?.data?.message)
                setcarousel(response?.data?.data)
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            } catch (error: any) {
                toast.error(error.response?.data?.message)
            }
        }
        getCategory();
        // eslint-disable-next-line
    }, [isRender])

    const edit = (e: any) => {
        setOpenPopUP(true)
        setcarouselEdit(e)
    }
    const Delete = async (e: any) => {
        setLoading(true)
        try {
            const response = await Http({
                url: '/carousel',
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
                    {carousel.length >=1 ?<div className="w-full h-full px-4 relative">
                        <div className="grid pt-3 grid-cols-1 gap-x-2 md:gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
                            {carousel?.map((e: any) => (
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
                    <PopUp title='Create Carousel' />
                </>}
        </>
    );
}

export default Carousels;
