
import { useState, type FC, useContext } from 'react';
import { Formik, Form } from "formik";
import Http from '../../Services/Http';
import { toast } from 'react-toastify';
import { DataContext } from '../../Context/DataProvider';
import Text from '../../Components/FormControl/Text';
import Image from '../../Components/FormControl/Image';

interface CreateCategoriesProps { }
interface FormValues {
    name: string;
    // image: string;
}

const CreateCategories: FC<CreateCategoriesProps> = () => {
    const {setOpenPopUP,categoryEdit,setIsRender,isRender} = useContext(DataContext)
    const [image, setImage] = useState<any>(categoryEdit?.image?._id ?? '' )
    const initialValues: FormValues = {
        name: categoryEdit?.name ||"",
        // image: categoryEdit?.image ||"",
    };
    const onsubmit = async (values: any) => {
        if(categoryEdit?.name){
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
        }else{
            
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
    const uploadImage = async(e:any)=>{
        // console.log(e.target.file)
        let FD = new FormData();
        FD.append('image',e)
        try {
            const response = await Http({
                url: '/media',
                method: 'post',
                data: FD
            });
            setImage(response.data.data._id)
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
                    <Text name='name' label='Enter Name'/>
                    <Image onImageUpload={uploadImage}/>
                    <button type='submit' disabled={image?false:true} className='border w-full font-medium px-4 py-1 mt-2 bg-primary text-white'>{categoryEdit?.name?'Update':'Save'}</button>
                </Form>
            </Formik>
        </>
    );
}

export default CreateCategories;

