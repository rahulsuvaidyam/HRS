import { Formik,Form } from 'formik';
import { useContext, type FC } from 'react';
import Text from '../../Components/FormControl/Text';
import Http from '../../Services/Http';
import { toast } from 'react-toastify';
import { DataContext } from '../../Context/DataProvider';

interface CreateEventProps {

}
interface FormValues {
    name: string;
}

const CreateEvent: FC<CreateEventProps> = () => {

    const {setOpenPopUP ,setIsRender,isRender,eventEdit} = useContext(DataContext)

    const initialValues: FormValues = {
        name: eventEdit?.name ||"",
    };

    const onsubmit = async (values: any) => {
        if(eventEdit?.name){
            values['_id'] = eventEdit?._id
            try {
                const response = await Http({
                    url: '/event',
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
            
        try {
            const response = await Http({
                url: '/event',
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
    return (
        <>
         <Formik
                initialValues={initialValues}
                //   validate={validate}
                onSubmit={onsubmit}>
                <Form className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <Text name='name' label='Enter Name'/>
                    {/* <Image onImageUpload={uploadImage}/> */}
                    <button type='submit'  className='border w-full font-medium px-4 py-1 mt-2 bg-blue-500 text-white'>{eventEdit?.name?'Update':'Save'}</button>
                </Form>
            </Formik>
        </>
    );
}

export default CreateEvent;
