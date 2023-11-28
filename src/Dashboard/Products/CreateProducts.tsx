import { useState, type FC, useContext, useEffect } from 'react';
import Http from '../../Services/Http';
import { Formik, Form } from "formik";
import { DataContext } from '../../Context/DataProvider';
import { toast } from 'react-toastify';
import Text from '../../Components/FormControl/Text';
import Number from '../../Components/FormControl/Number';
import Select from '../../Components/FormControl/Select';
import TextArea from '../../Components/FormControl/TextArea';
import Image from '../../Components/FormControl/Image';
import { IoIosClose } from 'react-icons/io' 
import TextEditor from '../../Components/FormControl/TextEditor';

interface CreateProductsProps { }
interface FormValues {
    name: string;
    price: number;
    category: string;
    discounts: number; 
    description: string;
    key_features: string;
}

const CreateProducts: FC<CreateProductsProps> = () => {
    const { setOpenPopUP ,productEdit,isRender,setIsRender} = useContext(DataContext)
    const [image, setImage] = useState<any>(productEdit?.images?.map((e:any)=>e?._id) ??[])
    const [images, setImages] = useState<any>(productEdit?.images ??[])
    const [category, setcategory] = useState<any>([])
    const [event, setevent] = useState<any>([])
    // console.log(productEdit)
    const initialValues: FormValues = {
        name: productEdit?.name ||"",
        price: productEdit?.price || 0,
        category: productEdit?.category?._id || "",
        description: productEdit?.description || "",
        discounts: productEdit?.discounts || 0,
        key_features: productEdit?.key_features || 0,
    };
//    console.log(category)
    useEffect(() => {
        const getCategory = async() => {
            try {
                const response = await Http({
                  url: '/categorydropdown',
                  method: 'get',
                });
                // toast.success(response?.data?.message)
                setcategory(response?.data?.data)
              } catch ( error:any) {
                toast.error(error.response?.data?.message)
              }
        }
        getCategory();
        const getEvent = async() => {
            try {
                const response = await Http({
                  url: '/event',
                  method: 'get',
                });
                // toast.success(response?.data?.message)
                setevent(response?.data?.data)
              } catch ( error:any) {
                toast.error(error.response?.data?.message)
              }
        }
        getEvent();
    }, [])
    const onsubmit = async (values: any) => {
        if(productEdit?.name){
            values['images'] = image;
            values['_id'] = productEdit?._id;
        try {
            const response = await Http({
                url: '/product',
                method: 'put',
                data: values
            });
            toast.success(response.data?.message)
            setOpenPopUP(false)
            setIsRender(!isRender)
        } catch (error: any) {
            toast.error(error.response.data?.message)
        }
        }else{
        values['images'] = image;
        try {
            const response = await Http({
                url: '/product',
                method: 'post',
                data: values
            });
            toast.success(response.data?.message)
            setOpenPopUP(false)
            setIsRender(!isRender)
        } catch (error: any) {
            toast.error(error.response.data?.message)
        }
    }
    }
    const uploadImage = async (e: any) => {
        let FD = new FormData();
        FD.append('image', e)
        try {
            const response = await Http({
                url: '/media',
                method: 'post',
                data: FD
            });
            setImage([...image,response.data.data._id])
            setImages([...images,response.data.data])
            toast.success(response.data?.message)
        } catch (error: any) {
            toast.error(error.response.data?.message)
        }
    }
    // console.log(image)
    const removeItem = async(e: any) => {
        const newImages = images.filter((el: any) => el._id !== e._id);
        const newImage = image.filter((el: any) => el !== e._id);
        console.log(newImages,newImage)
        setImages(newImages);
        setImage(newImage);
        try {
            const response = await Http({
                url: '/media',
                method: 'delete',
                data: {_id:e?._id}
            });
            toast.success(response.data?.message)
        } catch (error: any) {
            toast.error(error.response.data?.message)
        }
      };
      
    return (
        <>
            <Formik
                initialValues={initialValues}
                //   validate={validate}
                onSubmit={onsubmit}>
                <Form className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <Text name='name' label='Enter Name' />
                    <Number name='price' label='Enter Price' length='10'/>
                    <Number name='discounts' label='Enter Discounts' length='3'/>
                    <Select name='category' label='Category' array={category ?? []} />
                    <Select name='event' label='Event' array={event ?? []} />
                    <TextArea name='description' label='Enter Description' />
                    {images?.length >= 1 &&
                    <div className="flex items-center gap-2 border px-2 py-1 rounded-md mb-2">
                    {images?.map((e:any)=>(
                        <div key={e?._id} className="relative">
                        <div className="truncate w-8 h-8 border rounded-md ">
                             <img className='rounded-md w-full h-full' src={e?.url} alt="" />
                        </div>
                             <IoIosClose onClick={()=>removeItem(e)} className='cursor-pointer text-xl absolute -top-2 -right-2'/>
                        </div>
                    ))}
                </div>}
                    <Image onImageUpload={uploadImage} message='Multi'/>
                    <TextEditor label='' required={false} name='key_features' />
                    <button type='submit' disabled={image ? false : true} className='border w-full font-medium px-4 py-1 mt-2 bg-primary text-white'>{productEdit?.name?'Update':'Save'}</button>
                </Form>
            </Formik>
        </>
    );
}

export default CreateProducts;
