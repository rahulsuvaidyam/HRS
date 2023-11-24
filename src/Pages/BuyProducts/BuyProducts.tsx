import { useState, type FC, useContext, useEffect } from 'react';
import Stepers from './Stepers';
import { toast } from 'react-toastify';
import Http from '../../Services/Http';
import { DataContext } from '../../Context/DataProvider';
import AddressForm from '../Profile/Address/AddressForm';
import { BiRupee } from 'react-icons/bi';
import { TotalPriceWithDiscount } from '../../Services/TotalPrice';
import Items from './Items';
import CartLoader from '../../Components/Loader/CartLoader';
import ChangeAddress from './ChangeAddress';


interface BuyProductsProps { }

const BuyProducts: FC<BuyProductsProps> = () => {
  const [currentStep, setcurrentStep] = useState(1)
  const [slected, setSelected] = useState<any>()
  const [open, setOpen] = useState<boolean>(false)
  const [editData, seteditData] = useState(null)
  const [totalPrice, settotalPrice] = useState([])
  const [loader, setLoader] = useState(true)
  const [address, setaddress] = useState<any>({})
  const user = JSON.parse(sessionStorage.getItem('userDetails') ?? '{}')
  const { isRender } = useContext(DataContext)


  useEffect(() => {
    const get = async () => {
      setLoader(true)
      try {
        const response = await Http({
          url: '/addresso',
          method: 'get',
          data: { user: user?._id }
        });
        if (response.data.code === 'SUCCESS_200' && response.data.data) {
          setaddress(response?.data?.data)
          setTimeout(() => {
            setLoader(false)
          }, 500);
          setcurrentStep(2)
        } else {
          setTimeout(() => {
            setLoader(false)
          }, 500);
          setcurrentStep(1)
        }
      } catch (error: any) {
        toast.error(error.response.data?.message)
      }
    }


    get()
    // eslint-disable-next-line
  }, [isRender])

  const Order = async () => {
    setcurrentStep((prev) => prev + 1)

  }
  const EditAddress = async () => {
    setcurrentStep(1)
    seteditData(address)
  }
  const changeaddress = (e: any) => {
    setOpen(true)
    setSelected(e)
  }


  return (
    <>
      <div className="w-full h-full relative pt-12 md:pt-14 ">
        <Stepers {...{ currentStep }} />
        {loader && <CartLoader />}
        <div className='py-14 h-full max-w-[1600px] mx-auto'> {/* step one */}
          {currentStep === 1 && <div className='px-2 pt-2 md:px-8 lg:px-20'><AddressForm editData={editData} /> </div>}
          {/* step one */}
          {/* step two */}
          {currentStep === 2 && <div className="h-full overflow-y-auto scrollbar-thin md:px-4 lg:px-20 pt-4">
            <div className=" w-full bg-gray-50 shadow-md md:shadow-none md:border p-2 md:p-3 flex items-center justify-between">
              <div>
                <p className='flex gap-3'>{address?.name}<span>{address?.phone}</span></p>
                <p className='flex gap-3'>{address?.house_name} , {address?.road_name} ,
                  {address?.district?.name} District ,{address?.state?.name} - {address?.pin_code}</p>
              </div>
              <div className='flex flex-col gap-3 justify-between h-full items-end'>
                <button className='border px-2 py-0.5 text-sm rounded-md bg-white' onClick={()=>changeaddress(address._id)}>Change</button>
                <button onClick={EditAddress} className='border px-3 py-0.5 text-sm rounded-md bg-white'>Edit</button>

              </div>
            </div>
            <Items {...{ settotalPrice }} />
          </div>}
          {/* step two */}
          {currentStep >= 2 && <div className="w-full fixed bottom-0 left-0 px-2  md:px-20 bg-slate-50 h-14 flex items-center justify-between">
            <p className='flex items-center '>Tolal Price  <BiRupee />{TotalPriceWithDiscount(totalPrice)}</p>
            <button onClick={() => Order()} className='bg-blue-500 rounded-md md:rounded-none py-2 text-white px-8 md:px-16'>Continue</button>
          </div>}</div>
      </div>
      {/* change address */}
      <ChangeAddress {...{ open, setOpen, slected ,setSelected}} />
    </>
  );
}

export default BuyProducts;
