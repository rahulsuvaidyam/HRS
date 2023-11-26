import { useContext, type FC, useState, useEffect } from 'react';
import { BiPlus } from 'react-icons/bi'
import { DataContext } from '../../Context/DataProvider';
import PopUp from '../../Components/PopUp';
import { MdDelete, MdEdit } from 'react-icons/md';
import Spinner from '../../Components/Loader/Spinner';
import { toast } from 'react-toastify';
import Http from '../../Services/Http';
import DataNotFound from '../../Components/AlertPage/DataNotFound';

interface EventProps { }

const Event: FC<EventProps> = () => {
    const [event, setevent] = useState<any>([])
    let [loading, setLoading] = useState<boolean>(true);
    const { setOpenPopUP, seteventEdit, setIsRender, isRender } = useContext(DataContext)

    useEffect(() => {
        const getEvent = async () => {
            setLoading(true)
            try {
                const response = await Http({
                    url: '/event',
                    method: 'get',
                });
                // toast.success(response?.data?.message)
                setevent(response?.data?.data)
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            } catch (error: any) {
                toast.error(error.response?.data?.message)
            }
        }
        getEvent();
        // eslint-disable-next-line
    }, [isRender])

    const edit = (e: any) => {
        setOpenPopUP(true)
        seteventEdit(e)
    }
    const Delete = async (e: any) => {
        setLoading(true)
        try {
            const response = await Http({
                url: '/event',
                method: 'delete',
                data: { _id: e?._id }
            });
            setTimeout(() => {
                setLoading(false)
            }, 1000);
            toast.success(response?.data?.message)
            setIsRender(!isRender)
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }

    }
    return (
        <>
            {loading === true ? <Spinner loading={loading} />
                :
                <>
                    {event.length >= 1 ?
                        <div className="relative px-4 w-full h-full">
                            <div className="grid pt-3 grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                                {event?.map((e: any, index: number) => (
                                    <div key={e?._id} className="rounded-3xl border py-3">
                                        <div className=" relative group">
                                            {/* <img className='rounded-3xl hover:shadow-xl h-full w-full' src={process.env.REACT_APP_API_URL + '/' + e?.image?.url} alt="" /> */}
                                            <p className='text-xl text-center h-8'>EVENT</p>
                                            <div className=" absolute top-0 left-2 block group-hover:hidden">
                                                <p className="bg-opacity-75 bg-gray-500 rounded-full w-4 h-4 text-xs font-medium flex items-center justify-center text-white"> {index + 1}</p>
                                            </div>
                                            <div className=" absolute top-6 right-6 hidden group-hover:block">
                                                <div className=" bg-opacity-75 bg-gray-500 rounded-md p-1 flex items-center gap-2 ">
                                                    <MdDelete onClick={() => Delete(e)} className='text-red-500 text-lg cursor-pointer' />
                                                    <MdEdit onClick={() => edit(e)} className='text-yellow-500 text-lg cursor-pointer' />
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-xs truncate text-center pt-1">{e?.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div> : <DataNotFound />}
                    <div onClick={() => setOpenPopUP(true)} className='w-14 h-14 flex items-center cursor-pointer justify-center rounded-full border-2 fixed bottom-6 right-6'>
                        <BiPlus className='text-3xl text-gray-600' />
                    </div>
                    <PopUp title='Create Event' /></>}

        </>
    );
}

export default Event;
