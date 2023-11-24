import { useContext, type FC } from 'react';
import { Formik, Form } from "formik";
import Http from '../../Services/Http';
import { DataContext } from '../../Context/DataProvider';
import { toast } from 'react-toastify';
import Text from '../../Components/FormControl/Text';
import Password from '../../Components/FormControl/Password';
import * as Yup from 'yup';

interface LoginProps { }
interface FormValues {
    username: string;
    password: string;
}

const initialValues: FormValues = {
    username: "6201521438",
    password: "Rahul@123",
};

const Login: FC<LoginProps> = () => {

    const {setLogInPage,setIsRender} = useContext(DataContext)

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Name is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      });

    const onsubmit = async (values: any) => {
        try {
            const response = await Http({
              url: '/auth/login',
              method: 'post',
              data: values
            }, true);
            if (response.data?.code === 'SUCCESS_200') {
              sessionStorage.setItem('token', response.data.data.token);
              sessionStorage.setItem('userDetails', JSON.stringify(response.data.data.userDetail))
              toast.success(response.data?.message)
              setLogInPage(false)
              setIsRender(true)
            } else {
                toast.error(response?.data?.message)
            }
          } catch ( error:any ) {
            toast.error(error.response.data?.message)
          }
    }
    
    return (
        <>
             <div className="flex flex-col justify-around h-full">
              <p className='text-3xl text-center font-medium pb-3 sm:pb-0'>Sign In</p>
             <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onsubmit}>
                <Form className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <Text name='username' label='Enter Email/Mobile number'/>
                    <Password name='password' label='Enter Password'/>
                    <button type='submit' className='border w-full font-medium px-4 py-1 mt-2 bg-blue-500 text-white'>Sign In</button>
                </Form>
            </Formik>
             </div>
        </>
    );
}

export default Login;
