import { useEffect, type FC, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import Http from '../../Services/Http';
import { BiRupee } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { DataContext } from '../../Context/DataProvider';
import CartAlert from '../../Components/AlertPage/CartAlert';
import CartLoader from '../../Components/Loader/CartLoader';
import { TotalPrice } from '../../Services/TotalPrice';
interface CartProps { }

const Cart: FC<CartProps> = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [product_id, setProduct_id] = useState<any>([])
  sessionStorage.setItem('product_id',JSON.stringify(product_id))
  const { setIsRender, isRender } = useContext(DataContext)
  useEffect(() => {
    const GetCart = async () => {
      try {

        const response = await Http({
          url: '/cart',
          method: 'get',
        });
        setProducts(response?.data?.data)
        setProduct_id(response?.data?.data?.map((e:any)=>e._id))
        setLoading(false)
      } catch (error: any) {
        toast.error(error.response?.data?.message)
      }
    }
    GetCart()
  }, [isRender])
  const DeleteItem = async (e: any) => {
    try {

      const response = await Http({
        url: '/cart',
        method: 'delete',
        data: { _id: e }
      });
      setIsRender(!isRender)
      toast.success(response?.data?.message)
    } catch (error: any) {
      toast.error(error.response?.data?.message)
    }
  }
  const CartItemCount = async (e: any, value: any) => {
    try {

      const response = await Http({
        url: '/cart',
        method: 'put',
        data: { _id: e, value }
      });
      setIsRender(!isRender)
      toast.success(response?.data?.message)
    } catch (error: any) {
      toast.error(error.response?.data?.message)
    }
  }

  const SelectedProduct = (e: any) => {
    const index = product_id.indexOf(e);
  
    if (index !== -1) {
      const updatedProductIds = [...product_id];
      updatedProductIds.splice(index, 1);
      setProduct_id(updatedProductIds);
    } else {
      setProduct_id([...product_id, e]);
     
    }
  };
  return (
    <>
      {loading ? <CartLoader /> :
        products?.length >= 1 ?
          <div className="pt-12 md:pt-14 pb-16 overflow-y-auto scrollbar-thin w-full h-full px-0 md:px-8 bg-gray-100 relative" >
            <div className="w-full gap-2 md:pt-3 grid grid-cols-1 xl:grid-cols-2 ">
              {products?.map((e: any) => (
                <div key={e?._id} className=" h-36 md:h-40 p-2 text-gray-800 relative bg-white border flex flex-col md:flex-row justify-between">
                  <input type="checkbox" className='absolute right-2' onChange={()=>SelectedProduct(e._id)} checked={product_id.find((_id:string)=>(_id===e._id))}/>
                  <Link to={'/productdetails/' + e?.product?._id} className="flex gap-2 md:gap-4 group">
                    <img className='h-20 md:h-full rounded-md' src={process.env.REACT_APP_API_URL + '/' + e?.product?.images[0]?.url} alt="" />
                    <div className='flex flex-col justify-between'>
                      <div className='flex flex-col gap-5'>
                        <p className='text-sm md:text-lg truncate group-hover:underline'>{e?.product?.name}</p>
                        <p className=' truncate text-sm'><span className='text-gray-500'>Flavour : </span><span className="bg-gray-100 rounded-md p-1 text-gray-700 font-medium text-xs">{e?.product?.category.name}</span></p>
                      </div>
                      <div className="flex items-center gap-2 ">
                        <span className='flex items-center text-lg text-blue-500'><BiRupee className='text-md' />{e?.product?.discounts ? Math.ceil((100 - e?.product?.discounts) / 100 * e?.product?.price) * e?.count : e?.product?.price * e?.count}</span>
                        {e?.product?.discounts ?
                          <>
                            <del className='flex items-center text-sm text-gray-700'><BiRupee className='text-base' />{e?.product?.price * e?.count}</del>
                            <span className='text-green-500 text-sm font-medium'>{e?.product?.discounts}% off</span>
                          </> : ''}

                      </div>
                    </div>
                  </Link>
                  <div className="flex flex-row-reverse md:flex-col items-center justify-between">
                    <RiDeleteBin6Line onClick={() => DeleteItem(e?._id)} className='text-xl text-red-500 cursor-pointer' />
                    <div className="flex gap-2 items-center">
                      {/*  */}
                      <div className="flex bg-gray-100 px-2 py-1 rounded-md">
                        <button className=''>Qty :</button>
                        <select value={e?.count} name="" id="" onChange={(el) => CartItemCount(e?._id, el.target.value)} className='outline-none'>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
           {product_id.length > 0 &&  <div className="fixed w-full left-0 bg-white h-16 z-50 bottom-0 px-2 md:px-16 flex justify-between items-center">
              <p className='text-xl text-gray-700 flex items-center'>Total Price : <span className='text-lg flex items-center ' ><BiRupee /> {TotalPrice(products,product_id)}</span></p>
              <Link onClick={() => setIsRender(!isRender)} to='/buy' className='text-white bg-blue-500 px-4 py-2 md:px-10'>PLACE ORDER</Link>
            </div>}
          </div> : <CartAlert />}
    </>
  );
}

export default Cart;
