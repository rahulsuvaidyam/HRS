import { useEffect, type FC, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md'
import Http from '../../Services/Http';
import { toast } from 'react-toastify';

interface CategoryTableProps { }

const CategoryTable: FC<CategoryTableProps> = () => {

    const [category, setcategory] = useState<any>([])
//    console.log(category)
    useEffect(() => {
        const getCategory = async() => {
            try {
                const response = await Http({
                  url: '/category',
                  method: 'get',
                });
                // toast.success(response?.data?.message)
                setcategory(response?.data?.data)
              } catch ( error:any) {
                toast.error(error.response?.data?.message)
              }
        }
        getCategory();
    }, [])
    

    return (
        <> 
         <div className="relative overflow-x-auto px-2">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Sr No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actoin
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {category?.map((e:any,index:number)=>(
                              <tr key={index} className="bg-white border-b ">
                              <th scope="row" className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap ">
                                  {index+1}
                              </th>
                              <td className="px-6 py-3">
                                  {e?.name}
                              </td>
                              <td className="px-6 py-3 flex gap-2">
                                  <MdDelete className='text-red-500 text-lg cursor-pointer' />
                                  <MdEdit className='text-yellow-500 text-lg cursor-pointer' />
                              </td>
  
                          </tr>
                        ))}
                      
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default CategoryTable;
