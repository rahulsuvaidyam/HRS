import { useState, type FC, useEffect, useContext } from 'react';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import AddressForm from './AddressForm';
import { toast } from 'react-toastify';
import Http from '../../../Services/Http';
// import Http from '../../../Services/Http';
// import { toast } from 'react-toastify';
import { DataContext } from '../../../Context/DataProvider';

interface AddressProps {}

const Address: FC<AddressProps> = () => {

    const [addAddress, setAddAddress] = useState<boolean>(false)
    const [Address, setAddress] = useState<any[]>([])
    const [editData, seteditData] = useState<any>()
    const { setIsRender, isRender } = useContext(DataContext);
    // let userDetails = JSON.parse(sessionStorage.getItem('userDetails') ?? '{}')

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
     const Edit =(e:any)=>{
        seteditData(e)
        setAddAddress(true)
     }
     const Delete=async(e:any)=>{
        try {
            const response = await Http({
                url: '/address',
                method: 'delete', 
                data:{_id:e}
            });
            toast.success(response.data?.message)
            setIsRender(!isRender)

        } catch (error: any) {
            toast.error(error.response.data?.message)
        }
     }
    return (
        <>
        {addAddress?<AddressForm editData={editData} set={setAddAddress}/>:
        <div className="w-full pt-3">
            <button onClick={()=>setAddAddress(true)} className='w-full border py-2 flex items-center justify-center gap-3'><MdAdd/>ADD NEW ADDRESS</button>
            <div className="pt-6 flex flex-col gap-3">
                {Address?.map((e:any)=>(
                    <div key={e?._id} className=" w-full border p-3 flex items-center justify-between">
                       <div>
                       <p className='flex gap-3'>{e?.name}<span>{e?.phone}</span></p>
                        <p className='flex gap-3'>{e?.house_name} , {e?.road_name} ,
                         {e?.district?.name} District ,{e?.state?.name} - {e?.pin_code}</p>
                       </div>
                        <div className='flex flex-col gap-3'>
                            <MdDelete onClick={()=>Delete(e._id)}  className='cursor-pointer'/>
                            <MdEdit onClick={()=>Edit(e)} className='cursor-pointer'/>
                     
                        </div>
                    </div>
                ))}
            </div>
        </div>
        }
        </>
    );
}

export default Address;
