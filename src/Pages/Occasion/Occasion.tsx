import { useEffect, type FC, useState } from 'react';
import Http from '../../Services/Http';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import OccasionsLoader from '../../Components/Loader/OccasionsLoader';

interface OccasionProps { }

const Occasion: FC<OccasionProps> = () => {

    const [occasions, setOccasions] = useState<any>([])
    const [loader, setLoader] = useState<any>(true)

    useEffect(() => {
        const getOccasion = async () => {
            setLoader(true)
            try {
                const response = await Http({
                    url: '/eventoccasion',
                    method: 'get',
                }, true);
                setOccasions(response?.data?.data)
                setTimeout(() => {
                    setLoader(false)
                }, 1000);

            } catch (error: any) {
                toast.error(error.response?.data?.message)
            }

        }
        getOccasion();
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className="bg-white md:rounded-md shadow-md p-3 w-full h-full">
                <p className='text-2xl pt-2 pb-3 font-medium truncate'>Celebrate Special Occasions</p>
                {loader?<OccasionsLoader/>:
                <div className="w-full flex flex-col md:flex-row gap-3">
                    {occasions?.map((e: any) => (
                        <Link to={`/productlist/event/${e._id}`} key={e?._id} className=" w-full md:w-1/2">
                            <div className="w-full cursor-pointer overflow-hidden rounded-t-md">
                                {e?.name === 'Happy Birthday' ? <img className='rounded-t-md h-full w-full transition-all duration-200 hover:scale-105' src='https://www.fnp.com/assets/images/custom/cakes_23/special_occasion/Birthday_web.jpg' alt="" />
                                    : <img className='rounded-t-md h-full w-full transition-all duration-200 hover:scale-105' 
                                    src='https://www.fnp.com/assets/images/custom/cakes_23/special_occasion/Anniversary_web.jpg' alt="" />
                                }
                            </div>
                            <p className='text-center font-semibold pt-2'>{e?.name?.split(' ')[1]}</p>
                        </Link>
                    ))}
                </div>
                }
            </div>
        </>
    );
}

export default Occasion;
