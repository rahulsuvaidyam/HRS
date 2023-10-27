import { useContext, type FC } from 'react';
import Button from '../../Component/Button';
import { Formik, Form, Field } from "formik";
import Http from '../../Services/Http';
import { toast } from 'react-toastify';
import { DataContext } from '../../Context/DataProvider';

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
    phone:"",
    gender: "",
    password: "",
};


const Register: FC<RegisterProps> = () => {
    const {setLogInPage} = useContext(DataContext)
    const onsubmit = async(values: any) => {
        try {
            const response = await Http({
              url: '/auth/register',
              method: 'post',
              data: values
            }, true);
            toast.success(response.data?.message)
            setLogInPage(false)
          } catch ( error:any) {
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
                        <Field type="text" autoComplete="off" name="name" id="name"
                            className="block py-2.5 px-0 w-full text-sm
                        text-gray-600 bg-transparent border-0 border-b border-gray-300 appearance-none 
                            focus:outline-none focus:ring-0 focus:border-blue-400
                            peer" placeholder=" " />
                        <label htmlFor="name" className="font-medium absolute  text-gray-500 
                        duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:scale-75 peer-focus:-translate-y-6">
                            Enter Name
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <Field type="text" autoComplete="off" name="email" id="email"
                            className="block py-2.5 px-0 w-full text-sm
                        text-gray-600 bg-transparent border-0 border-b border-gray-300 appearance-none 
                            focus:outline-none focus:ring-0 focus:border-blue-400
                            peer" placeholder=" " />
                        <label htmlFor="email" className="font-medium absolute  text-gray-500 
                        duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:scale-75 peer-focus:-translate-y-6">
                            Enter Email
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <Field type="number" autoComplete="off" name="phone" id="phone"
                            className="block py-2.5 px-0 w-full text-sm
                        text-gray-600 bg-transparent border-0 border-b border-gray-300 appearance-none 
                            focus:outline-none focus:ring-0 focus:border-blue-400
                            peer" placeholder=" " />
                        <label htmlFor="phone" className="font-medium absolute  text-gray-500 
                        duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:scale-75 peer-focus:-translate-y-6">
                            Enter Mobile number
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
                    <div className="">
                        <label htmlFor="gender" className='text-gray-500 text-sm font-medium'>Gender</label>
                        <div className="flex gap-x-2">
                            <div className="flex items-center gap-x-2">
                                <Field id="male" value='MALE' name="gender" type="radio" className="h-3 w-3 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                <label htmlFor="male" className="block text-sm font-medium leading-6 text-gray-600">Male</label>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <Field id="female" value='FEMALE' name="gender" type="radio" className="h-3 w-3 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                <label htmlFor="female" className="block text-sm font-medium leading-6 text-gray-600">Female</label>
                            </div>
                        </div>
                    </div>
                    <div className="pt-2">
                        <Button title='Sign Up' w='full' bg='blue-500' text='white'/>
                    </div>
                </Form>
            </Formik>
        </>
    );
}

export default Register;
