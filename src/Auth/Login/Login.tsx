import { useContext, type FC } from 'react';
import { Formik, Form, Field } from "formik";
import Http from '../../Services/Http';
import { DataContext } from '../../Context/DataProvider';
import { toast } from 'react-toastify';

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

    const {setLogInPage} = useContext(DataContext)
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
            } else {
                toast.error(response?.data?.message)
            }
          } catch ( error:any ) {
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
                    <div className="relative z-0 w-full mb-5 group">
                        <Field type="text" autoComplete="off" name="username" id="username"
                            className="block py-2.5 px-0 w-full text-sm
                        text-gray-600 bg-transparent border-0 border-b border-gray-300 appearance-none 
                            focus:outline-none focus:ring-0 focus:border-blue-400
                            peer" placeholder=" " />
                        <label htmlFor="username" className="font-medium absolute  text-gray-500 
                        duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:scale-75 peer-focus:-translate-y-6">
                            Enter Email/Mobile number
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-1 group">
                        <Field type="password" autoComplete="off" name="password" id="password"
                            className="block py-2.5 px-0 w-full text-sm
                        text-gray-600 bg-transparent border-0 border-b border-gray-300 appearance-none 
                            focus:outline-none focus:ring-0 focus:border-blue-400
                            peer" placeholder=" " />
                        <label htmlFor="password" className="font-medium absolute  text-gray-500 
                        duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:scale-75 peer-focus:-translate-y-6">
                            Enter Password
                        </label>
                    </div>
                    <button type='submit' className='border w-full font-medium px-4 py-1 mt-2 bg-blue-500 text-white'>Sign In</button>
                </Form>
            </Formik>
        </>
    );
}

export default Login;
