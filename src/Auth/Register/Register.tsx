import { useContext, type FC } from 'react';
import { Formik, Form } from "formik";
import Http from '../../Services/Http';
import { toast } from 'react-toastify';
import { DataContext } from '../../Context/DataProvider';
import Text from '../../Components/FormControl/Text';
import Number from '../../Components/FormControl/Number';
import Password from '../../Components/FormControl/Password';
import Gender from '../../Components/FormControl/Gender';

interface RegisterProps {
}
interface FormValues {
    name: string;
    email: string;
    phone: string;
    gender: string,
    password: string;
}

const initialValues: FormValues = {
    name: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
};


const Register: FC<RegisterProps> = () => {
    const { setLogInPage } = useContext(DataContext)
    const onsubmit = async (values: any) => {
        try {
            const response = await Http({
                url: '/auth/register',
                method: 'post',
                data: values
            }, true);
            toast.success(response.data?.message)
            setLogInPage(false)
        } catch (error: any) {
            toast.error(error.response.data?.message)
        }
    }
    return (
        <>
            <div className="flex flex-col justify-around h-full">
                <p className='text-3xl text-center font-medium'>Sign Up</p>
                <Formik
                    initialValues={initialValues}
                    //   validate={validate}
                    onSubmit={onsubmit}>
                    <Form className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <Text name='name' label='Enter Name' />
                        <Text name='email' label='Enter Email' />
                        <Number name='phone' label='Enter Phone Number' />
                        <Password name='password' label='Enter Password' />
                        <Gender />
                        <button type='submit' className='border w-full font-medium px-4 py-1 mt-2 bg-blue-500 text-white'>Sign Up</button>
                    </Form>
                </Formik>
            </div>
        </>
    );
}

export default Register;
