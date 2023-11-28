import { useState, type FC, useContext, useEffect } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md'
import Http from '../../Services/Http';
import { toast } from 'react-toastify';
import { BiPlus } from 'react-icons/bi'
import { DataContext } from '../../Context/DataProvider';
import PopUp from '../../Components/PopUp';
import Spinner from '../../Components/Loader/Spinner';
import DataNotFound from '../../Components/AlertPage/DataNotFound';

interface CategoriesProps { }

const Categories: FC<CategoriesProps> = () => {
    const [category, setcategory] = useState<any>([])
    let [loading, setLoading] = useState<boolean>(true);
    const { setOpenPopUP, setCategoryEdit, isRender, setIsRender } = useContext(DataContext)
    //    console.log(category)
    useEffect(() => {
        const getCategory = async () => {
            setLoading(true)
            try {
                const response = await Http({
                    url: '/category',
                    method: 'get',
                });
                // toast.success(response?.data?.message)
                setcategory(response?.data?.data)
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
        setCategoryEdit(e)
    }
    const Delete = async (e: any) => {
        setLoading(true)
        try {
            const response = await Http({
                url: '/category',
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
        try {
            const response = await Http({
                url: '/media',
                method: 'delete',
                data: { _id: e?.image?._id }
            });
            console.log(response)
        } catch (error: any) {
            toast.error(error.response.data?.message)
        }
    }
    return (
        <>
            {loading === true ? <Spinner loading={loading} />
                :
                <>
                    {category.length >= 1 ?
                        <div className="relative px-4 w-full h-full">
                            <div className="grid pt-3 grid-cols-3 gap-x-2 md:gap-x-6 gap-y-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
                                {category?.map((e: any, index: number) => (
                                    <div key={e?._id} className="rounded-3xl">
                                        <div className=" relative group">
                                            <img className='rounded-3xl hover:shadow-xl h-full w-full' src={e?.image?.url} alt="" />
                                            <div className=" absolute top-10 left-12 block group-hover:hidden">
                                                <p className="bg-opacity-75 bg-gray-500 rounded-full w-4 h-4 text-xs font-medium flex items-center justify-center text-white"> {index + 1}</p>
                                            </div>
                                            <div className=" absolute top-9 right-6 hidden group-hover:block">
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
                    <PopUp title='Create Category' /></>}

        </>
    );
}

export default Categories;
