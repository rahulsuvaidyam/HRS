import { useState, type FC, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdDelete, MdEdit } from 'react-icons/md'
import {BiPlus} from 'react-icons/bi'
import { DataContext } from '../../Context/DataProvider';
import Http from '../../Services/Http';
import PopUp from '../../Components/PopUp';
import Spinner from '../../Components/Loader/Spinner';

interface ProductProps {}

const Product: FC<ProductProps> = () => {
    const [product, setProduct] = useState<any>([])
    let [loading, setLoading] = useState<boolean>(true);
    const {setOpenPopUP} = useContext(DataContext)
//    console.log(category)
    useEffect(() => {
        const getCategory = async() => {
            try {
                const response = await Http({
                  url: '/product',
                  method: 'get',
                });
                // toast.success(response?.data?.message)
                setProduct(response?.data?.data)
                setOpenPopUP(false)
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
              } catch ( error:any) {
                toast.error(error.response?.data?.message)
              }
        }
        getCategory();
        // eslint-disable-next-line
    }, [])
    return (
        <>
         {loading===true?<Spinner loading={loading}/>
        :<>
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
                        {product?.map((e:any,index:number)=>(
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
                <div onClick={()=>setOpenPopUP(true)} className='w-14 h-14 flex items-center cursor-pointer justify-center rounded-full border-2 fixed bottom-6 right-6'>
                    <BiPlus className='text-3xl text-gray-600'/>
                </div>
            </div>
           <PopUp title='Create Product'/>
           </>}
        </>
    );
}

export default Product;