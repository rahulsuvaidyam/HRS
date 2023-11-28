import { Form, Formik } from 'formik';
import { useContext, type FC, useState } from 'react';
import Image from '../../Components/FormControl/Image';
import { IoIosClose } from 'react-icons/io';
import { DataContext } from '../../Context/DataProvider';
import Http from '../../Services/Http';
import { toast } from 'react-toastify';
import Text from '../../Components/FormControl/Text';
import TextArea from '../../Components/FormControl/TextArea';
import Select from '../../Components/FormControl/Select';

interface CreateCarouselsProps {}

interface FormValues {
    name: string;
    description: string;
    status: string;
}

const CreateCarousels: FC<CreateCarouselsProps> = () => {
    const {carouselEdit,setOpenPopUP,isRender,setIsRender} = useContext(DataContext)
    const [image, setImage] = useState<any>(carouselEdit?.images?.map((e:any)=>e?._id) ??[])
    const [images, setImages] = useState<any>(carouselEdit?.images ??[])

    const initialValues: FormValues = {
        name: carouselEdit?.name ||"",
        description: carouselEdit?.description ||"",
        status: carouselEdit?.status ||"",
     
    };

    const onsubmit = async (values: any) => {
        if(carouselEdit?.name){
            values['images'] = image;
            values['_id'] = carouselEdit?._id;
        try {
            const response = await Http({
                url: '/carousel',
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
                url: '/carousel',
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
            setImage([...image,response?.data?.data?._id])
            setImages([...images,response?.data?.data])
            toast.success(response?.data?.message)
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
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
                    <Select name='status' label='Status' array={[{_id:'active',name:'Active'},{_id:'inactive',name:'Inactive'}]}/>
                    <TextArea  name='description' label='Enter Description'/>
                    {images?.length >= 1 &&
                    <div className="flex items-center gap-2 border px-2 py-1 rounded-md mb-2">
                    {images?.map((e:any)=>(
                        <div key={e?._id} className="relative">
                        <div className="truncate w-20 h-8 border rounded-md ">
                             <img className='rounded-md w-full h-full' src={e?.url} alt="" />
                        </div>
                             <IoIosClose onClick={()=>removeItem(e)} className='cursor-pointer text-xl absolute -top-2 -right-2'/>
                        </div>
                    ))}
                </div>}
                    <Image onImageUpload={uploadImage} message='Multi'/>
                    <button type='submit' disabled={image ? false : true} className='border w-full font-medium px-4 py-1 mt-2 bg-primary text-white'>{carouselEdit?.name?'Update':'Save'}</button>
                </Form>
            </Formik>
        </>
    );
}

export default CreateCarousels;
