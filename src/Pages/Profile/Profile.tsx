import { useContext, type FC } from 'react';
import { DataContext } from '../../Context/DataProvider';
import avatarM from '../../Assets/UserImage/avatarm.png'
import avatarF from '../../Assets/UserImage/avatarf.jpeg'
import { Formik, Form, Field } from "formik";
import Http from '../../Services/Http';
import { toast } from 'react-toastify';
// import Details from '../Details/Details';

interface ProfileProps { }
interface FormValues {
    name: string;
    email: string;
    phone: string;
    gender: string,
}



const Profile: FC<ProfileProps> = () => {
    const {userDetails} = useContext(DataContext)
    const initialValues: FormValues = {
    name: "Rahul Kumar",
    email: "rahul.suvaidyam@gmail.com",
    phone:"6201521438",
    gender: "MALE",
};
    const onsubmit = async(values: any) => {
        try {
            const response = await Http({
              url: '/auth/userupdate',
              method: 'put',
              data: values
            }, true);
            toast.success(response.data?.message)
            // setLogInPage(false)
          } catch ( error:any) {
            toast.error(error.response.data?.message)
          }
    }

    return (
        <>
            <div className="pt-12 md:pt-14 w-full h-full flex flex-col md:px-8">
                <div className="flex flex-col md:flex-row gap-3 h-full md:pt-4">
                    <div className="w-full md:w-1/4 md:h-full flex flex-col gap-3">
                        <div className="w-full h-32 md:h-16 bg-gray-50 md:border flex flex-col md:flex-row items-center justify-center md:justify-start md:gap-3 md:px-4">
                            <div className="w-12 min-w-[48px] h-12 rounded-full border">
                                <img className='rounded-full' src={userDetails.gender ==='MALE'?avatarM:avatarF} alt="" />
                            </div>
                            <div className="text-sm">
                                <span className='text-xs font-medium hidden md:block'>Hello</span>
                                <p className='text-xl md:text-base font-medium text-gray-600 truncate'>{userDetails.name}</p>
                            </div>
                        </div>
                        <div className="w-full border md:px-2 hidden md:block">Order</div>
                    </div>
                    <div className="w-full md:w-[75%] md:border md:h-full">
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
                    <button type='submit' className='border w-full font-medium px-4 py-1 mt-2 bg-blue-500 text-white'>Submit</button>
                </Form>
            </Formik>
                    </div>
                </div>
                {/* <div className="order-2">
                    <Details />
                </div>
                <div className="order-1">
                    profile
                </div> */}
            </div>
        </>
    );
}

export default Profile;
