import { useState, type FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import Http from '../../Services/Http';
import { Link } from 'react-router-dom';
import CategoryLoader from '../../Components/Loader/CategoryLoader';

interface CategoryListProps { }

const CategoryList: FC<CategoryListProps> = () => {
    const [categoryList, setcategoryList] = useState<any>([])
    const [loader, setLoader] = useState<any>(true)
    useEffect(() => {
        const getCategory = async () => {
            setLoader(true)
            try {
                const response = await Http({
                    url: '/categoryshow',
                    method: 'get',
                }, true);
                // toast.success(response?.data?.message)
                setTimeout(() => {
                    setLoader(false)
                }, 1000);
                setcategoryList(response?.data?.data)
            } catch (error: any) {
                toast.error(error.response?.data?.message)
            }
        }
        getCategory();
    }, [])
    return (
        <>
            <div className="px-2 md:px-8 py-2 flex items-center gap-3 md:gap-5 overflow-x-scroll scrollbar-thin">
                {loader ? <CategoryLoader /> :
                    categoryList?.map((e: any, index: number) => (
                        <Link to={`/productlist/${e._id}/${null}`} key={index} className="flex flex-col items-center cursor-pointer">
                            <div className="md:w-32 w-16  rounded-full md:rounded-3xl border-2 md:border-0">
                                <img className='rounded-full md:rounded-3xl' src={process.env.REACT_APP_API_URL + '/' + e?.image?.url} alt="" />
                            </div>
                            <p className='text-sm md:text-lg font-medium'>{e?.name}</p>
                        </Link>
                    ))}
            </div>
        </>
    );
}

export default CategoryList;
