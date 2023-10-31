import { useEffect, type FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import Filter from '../../Components/Filter';
import Http from '../../Services/Http';
import { toast } from 'react-toastify';

interface ProductListProps {}


const ProductList: FC<ProductListProps> = () => {
    const {category} = useParams()
    const [product, setProduct] = useState<any>([])
   
    useEffect(() => {
        const getProducts = async() => {
            try {
                const response = await Http({
                  url: '/productid',
                  method: 'get',
                  data:{category}
                });
                // toast.success(response?.data?.message)
                setProduct(response?.data?.data)
                
              } catch ( error:any) {
                toast.error(error.response?.data?.message)
              }
        }
        getProducts();
        // eslint-disable-next-line
    }, [])
    return (
        <>
        <div className="pt-12 md:pt-14 w-full h-full  ">
            <Filter/>
            <div className="w-full h-full pt-2 md:pl-[300px]">
                <div className="grid grid-cols-1 px-2 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {product?.map((e:any)=>(
                      <div key={e._id} className="border h-64 rounded-sm">
                        <img className='rounded-t-sm p-0.5 max-h-44 w-full' src={process.env.REACT_APP_API_URL+'/'+e?.images[0]?.url} alt="" />
                        
                      </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}

export default ProductList;
