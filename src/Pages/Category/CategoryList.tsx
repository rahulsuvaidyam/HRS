import { useState, type FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import Http from '../../Services/Http';
import { Link } from 'react-router-dom';

interface CategoryListProps { }

const CategoryList: FC<CategoryListProps> = () => {
    const [categoryList, setcategoryList] = useState<any>([])
    //    console.log(category)
    useEffect(() => {
        const getCategory = async () => {
            try {
                const response = await Http({
                    url: '/category',
                    method: 'get',
                });
                // toast.success(response?.data?.message)
                setcategoryList(response?.data?.data)
            } catch (error: any) {
                toast.error(error.response?.data?.message)
            }
        }
        getCategory();
    }, [])
    return (
        <>
            <div className="px-8 py-2 flex items-center gap-3">
                {categoryList?.map((e: any ,index:number) => (
                    <Link to={'/productlist/'+e._id} key={index} className="flex flex-col items-center cursor-pointer">
                        <div className="w-16 h-16 rounded-full border-2">

                        </div>
                        <p className='text-sm font-medium'>{e?.name}</p>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default CategoryList;
