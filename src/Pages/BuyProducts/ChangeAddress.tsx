import { useRef, type FC, Fragment, useEffect, useContext, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import Http from '../../Services/Http';
import { toast } from 'react-toastify';
import { DataContext } from '../../Context/DataProvider';

interface ChangeAddressProps {
    open: boolean,
    setOpen: any
    slected:any
    setSelected:any
}

const ChangeAddress: FC<ChangeAddressProps> = ({ open, setOpen ,slected,setSelected}) => {
    const [Address, setAddress] = useState<any[]>([])
   
    const { isRender,setIsRender } = useContext(DataContext);

    const cancelButtonRef = useRef(null)

    useEffect(() => {
        const getData = async()=>{
         try {
             const response = await Http({
                 url: '/address',
                 method: 'get', 
             });
             setAddress(response.data?.data)
 
         } catch (error: any) {
             toast.error(error.response.data?.message)
         }
        
        }
        getData()
     }, [isRender])

     const checkSelected = async(e:any)=>{
        setSelected(e._id)
        try {
            
            const response = await Http({
                url: '/address',
                method: 'put',
                data: {_id:e._id}
            });
            if (response.data.code === 'SUCCESS_200') {
                setIsRender(!isRender)
                setOpen(false)
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error.response.data?.message)
        }
     }
    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-30" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 h-screen z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full  items-center justify-center px-2 sm:px-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform h-auto overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all flex flex-col md:flex-row  w-full sm:max-w-2xl">
                                    <div className="p-3 w-full flex flex-col gap-3">
                                        {Address?.map((e: any) => (
                                            <div key={e?._id} onClick={()=>checkSelected(e)}  className=" w-full border p-3 flex items-center justify-between">
                                                <div>
                                                    <p className='flex gap-3'>{e?.name}<span>{e?.phone}</span></p>
                                                    <p className='flex gap-3'>{e?.house_name} , {e?.road_name} ,
                                                        {e?.district?.name} District ,{e?.state?.name} - {e?.pin_code}</p>
                                                </div>
                                                <input  checked={slected === e._id} type="radio" name='addresh'/>
                                            </div>
                                        ))}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}

export default ChangeAddress;
