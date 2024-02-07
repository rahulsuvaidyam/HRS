
import { useState, type FC, useContext, useEffect } from 'react';
import { Formik, Form } from "formik";
import Http from '../../Services/Http';
import { toast } from 'react-toastify';
import { DataContext } from '../../Context/DataProvider';
import Text from '../../Components/FormControl/Text';
import Image from '../../Components/FormControl/Image';
import { IoIosClose } from 'react-icons/io';
import Select from '../../Components/FormControl/Select';

interface CreateCategoriesProps { }
interface FormValues {
    name: string;
    // image: string;
}

const CreateCategories: FC<CreateCategoriesProps> = () => {
    const { setOpenPopUP, categoryEdit, setIsRender, isRender } = useContext(DataContext)
    const [image, setImage] = useState<any>(categoryEdit?.image?._id ?? '')
    const [images, setImages] = useState<any>(categoryEdit?.image ?? '')
    const [category, setCuategory] = useState<any>([])

    const initialValues: FormValues = {
        name: categoryEdit?.name || "",
        // image: categoryEdit?.image ||"",
    };
    const onsubmit = async (values: any) => {
        if (categoryEdit?.name) {
            values['image'] = image;
            values['_id'] = categoryEdit?._id
            try {
                const response = await Http({
                    url: '/category',
                    method: 'put',
                    data: values
                });
                toast.success(response.data?.message)
                setOpenPopUP(false)
                setIsRender(!isRender)
            } catch (error: any) {
                toast.error(error.response.data?.message)
            }
        } else {

            values['image'] = image;
            try {
                const response = await Http({
                    url: '/category',
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
        // console.log(e.target.file)
        let FD = new FormData();
        FD.append('image', e)
        try {
            const response = await Http({
                url: '/media',
                method: 'post',
                data: FD
            });
            setImage(response.data.data._id)
            setImages(response.data.data)
            toast.success(response.data?.message)
        } catch (error: any) {
            toast.error(error.response.data?.message)
        }
    }
    const removeItem = async (e: any) => {
        setImages(images?._id !== e?._id)
        try {
            const response = await Http({
                url: '/media',
                method: 'delete',
                data: { _id: e?._id }
            });
            toast.success(response.data?.message)
        } catch (error: any) {
            toast.error(error.response.data?.message)
        }
    };
    useEffect(() => {
        const getCategory = async() => {
            try {
                const response = await Http({
                    url:'/category',
                    method:'get'
                })
                setCuategory(response.data.data)
            } catch (error:any) {
                toast.error(error.response.data?.message)
            }
        }
        getCategory()
    }, [isRender])

    return (
        <>
            <Formik
                initialValues={initialValues}
                //   validate={validate}
                onSubmit={onsubmit}>
                <Form className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <Text name='name' label='Enter Name' />
                    <Select array={category} label='Sub Category' name='parent'/>
                    {images?._id && <div className="flex items-center gap-2 border px-2 py-1 rounded-md mb-2">
                        <div key={images?._id} className="relative">
                            <div className="truncate w-20 h-8 border rounded-md ">
                                <img className='rounded-md w-full h-full' src={images?.url} alt="" />
                            </div>
                            <IoIosClose onClick={() => removeItem(images)} className='cursor-pointer text-xl absolute -top-2 -right-2' />
                        </div>
                    </div>}
                    <Image onImageUpload={uploadImage} message='Single' />
                    <button type='submit' disabled={image ? false : true} className='border w-full font-medium px-4 py-1 mt-2 bg-primary text-white'>{categoryEdit?.name ? 'Update' : 'Save'}</button>
                </Form>
            </Formik>
        </>
    );
}

export default CreateCategories;

