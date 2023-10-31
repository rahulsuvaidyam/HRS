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

interface CreateProductsProps { }
interface FormValues {
    name: string;
    price: number;
    category: string;
    description: string;
    discounts: number;
    images: string;
}

const initialValues: FormValues = {
    name: "",
    price: 0,
    category: "",
    description: "",
    discounts: 0,
    images: "",
};
const CreateProducts: FC<CreateProductsProps> = () => {
    const [image, setImage] = useState<any>([])
    const [category, setcategory] = useState<any>([])
    const { setOpenPopUP } = useContext(DataContext)
//    console.log(category)
    useEffect(() => {
        const getCategory = async() => {
            try {
                const response = await Http({
                  url: '/categoryfordd',
                  method: 'get',
                });
                // toast.success(response?.data?.message)
                setcategory(response?.data?.data)
              } catch ( error:any) {
                toast.error(error.response?.data?.message)
              }
        }
        getCategory();
    }, [])
    
    const onsubmit = async (values: any) => {
        console.log(values)
        values['images'] = image;
        try {
            const response = await Http({
                url: '/product',
                method: 'post',
                data: values
            });
            toast.success(response.data?.message)
            setOpenPopUP(false)
        } catch (error: any) {
            toast.error(error.response.data?.message)
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
            toast.success(response.data?.message)
        } catch (error: any) {
            toast.error(error.response.data?.message)
        }
    }
    return (
        <>
            <Formik
                initialValues={initialValues}
                //   validate={validate}
                onSubmit={onsubmit}>
                <Form className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <Text name='name' label='Enter Name' />
                    <Number name='price' label='Enter Price' />
                    <Number name='discounts' label='Enter Discounts' />
                    <Select name='category' label='Category' array={category ?? []} />
                    <TextArea name='description' label='Enter Description' />
                    <Image onImageUpload={uploadImage}/>
                  
                    <button type='submit' disabled={image ? false : true} className='border w-full font-medium px-4 py-1 mt-2 bg-blue-500 text-white'>Save</button>
                </Form>
            </Formik>
        </>
    );
}

export default CreateProducts;
