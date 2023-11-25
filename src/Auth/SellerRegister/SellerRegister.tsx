import { useContext, type FC } from 'react';
import { Formik, Form } from "formik";
import Http from '../../Services/Http';
import { toast } from 'react-toastify';
import { DataContext } from '../../Context/DataProvider';
import Text from '../../Components/FormControl/Text';
import Number from '../../Components/FormControl/Number';
import Password from '../../Components/FormControl/Password';
import Gender from '../../Components/FormControl/Gender';
import { useNavigate } from 'react-router-dom';

interface SellerRegisterProps {
}
interface FormValues {
    name: string;
    email: string;
    shop_name: string;
    address: string;
    pin_code: string;
    phone: string;
    gender: string,
    password: string;
}

const initialValues: FormValues = {
    name: "",
    email: "",
    shop_name: "",
    address: "",
    pin_code: "",
    phone:"",
    gender: "",
    password: "",
};


const SellerRegister: FC<SellerRegisterProps> = () => {
    const {setLogInPage} = useContext(DataContext)
    const navigate = useNavigate()
    const onsubmit = async(values: any) => {
        values['role'] = 'SELLER'
        values['details'] = {
                            shop_name:values.shop_name,
                            address:values.shop_name,
                            pin_code:values.pin_code,
                            } 
        try {
            const response = await Http({
              url: '/auth/register',
              method: 'post',
              data: values
            }, true);
            toast.success(response.data?.message)
            navigate('/')
            setLogInPage(true)
          } catch ( error:any) {
            toast.error(error.response.data?.message)
          }
    }
    return (
        <>
           <div className="pt-12 md:pt-14 flex flex-col px-12 h-full">
            <p className='text-center pt-5 text-xl uppercase'>Sign up for seller</p>
           <Formik
                initialValues={initialValues}
                //   validate={validate}
                onSubmit={onsubmit}>
                <Form className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-14">
                  <Text name='name' label='Enter Name'/>
                   <Text name='email' label='Enter Email'/>
                   <Text name='shop_name' label='Enter Shop Name'/>
                   <Text name='address' label='Enter Address'/>
                   <Number name='pin_code' label='Enter Pin Code'/>
                   <Number name='phone' label='Enter Phone Number'/>
                   <Password name='password' label='Enter Password'/>
                    <Gender/>
                  </div>
                    <button type='submit' className='border w-1/2 font-medium px-4 py-1 mt-2 bg-primary text-white'>Create</button>
                </Form>
            </Formik>
           </div>
        </>
    );
}

export default SellerRegister;
