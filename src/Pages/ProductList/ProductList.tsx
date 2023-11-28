import { useEffect, type FC, useState } from 'react';
import { useParams } from 'react-router-dom';
// import Filter from '../../Components/Filter';
import { BiRupee } from 'react-icons/bi'
import { BsStarHalf } from 'react-icons/bs'
import Http from '../../Services/Http';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Spinner from '../../Components/Loader/Spinner';
import DataNotFound from '../../Components/AlertPage/DataNotFound';
import { RiCake2Line } from 'react-icons/ri';

interface ProductListProps { }


const ProductList: FC<ProductListProps> = () => {
  const  location = useParams()
  console.log(location)
  const [product, setProduct] = useState<any>([])
  let [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let data: any;
        if (location.category) {
          data = { category:location.category }
        } else if (location.event) {
          data = { event:location.event }
        }

        const response = await Http({
          url: '/categorybyproduct',
          method: 'get',
          data
        });
        // toast.success(response?.data?.message)
        setProduct(response?.data?.data)
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
  return (
    <>
      <div className="pt-12 md:pt-14 w-full h-full pb-3 max-w-[1600px] mx-auto">
        {/* <Filter/> */}
        {loading ? <Spinner loading={loading} /> :
          product.length >= 1?
          <div className="w-full h-full pt-2 px-2 md:px-8 ">
            <div className="w-full px-2 pt-1 rounded-md text-xl flex items-center gap-3 font-medium"><RiCake2Line className='text-3xl'/>{location.category?product[0]?.category?.name : product[0]?.event?.name} Cake </div>
            <div className="grid pt-3 grid-cols-2 gap-x-2 md:gap-x-6 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {product?.map((e: any) => (
                <Link to={'/productdetails/' + e._id} key={e._id} target="_blank" className="border hover:shadow-xl cursor-pointer rounded-sm">
                  <img className='rounded-t-sm p-0.5 max-h-44 w-full' src={e?.images[0]?.url} alt="" />
                  <div className="w-full p-1 flex flex-col gap-2">
                    <p className="text-sm truncate">{e?.name}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <span className='flex items-center'><BiRupee className='text-lg' />{e?.discounts ? Math.ceil((100 - e?.discounts) / 100 * e?.price) : e?.price}</span>
                        {e?.discounts ? <>
                          <del className='flex items-center text-sm text-gray-700'><BiRupee className='text-md' />{e?.price}</del>
                          <span className='text-primary text-sm font-medium'>{e?.discounts}% off</span></>
                          : ''}
                      </div>
                      <div className="bg-primary rounded-sm px-1 text-sm text-white flex items-center gap-1">4.3 <BsStarHalf className='text-xs' /></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className='text-xs font-medium'>{e?.category?.name}</span>
                      <div className="text-xs text-gray-500">456 Reviews</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>:<DataNotFound/>
        }
      </div>
    </>
  );
}

export default ProductList;
