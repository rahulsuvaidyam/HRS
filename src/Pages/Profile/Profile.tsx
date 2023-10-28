import { useState, type FC, useContext } from 'react';
import avatarM from '../../Assets/UserImage/avatarm.png'
import avatarF from '../../Assets/UserImage/avatarf.jpeg'
import { Formik, Form, Field } from "formik";
import Http from '../../Services/Http';
import { toast } from 'react-toastify';
import { DataContext } from '../../Context/DataProvider';
import Details from '../Details/Details';
import { AiOutlineUser } from 'react-icons/ai'
import { BiCurrentLocation } from 'react-icons/bi'
import { BsArrowLeft } from 'react-icons/bs'
import { MdKeyboardArrowRight } from 'react-icons/md'

interface ProfileProps { }
interface FormValues {
    name: string;
    email: string;
    phone: string;
    gender: string,
}



const Profile: FC<ProfileProps> = () => {
    const [edit, setEdit] = useState<boolean>(true)
    const [editProfile, setEditProfile] = useState<boolean>(false)
    const { setIsRender, isRender } = useContext(DataContext);
    let userDetails = JSON.parse(sessionStorage.getItem('userDetails') ?? '{}')

    const initialValues: FormValues = {
        name: userDetails?.name ?? "",
        email: userDetails?.email ?? "",
        phone: userDetails?.phone ?? "",
        gender: userDetails?.gender ?? "",
    };
    const onsubmit = async (values: any) => {
        try {
            const response = await Http({
                url: '/profile',
                method: 'put',
                data: { ...values, _id: userDetails._id },
            });
            toast.success(response.data?.message)
            setEdit(true)
            setIsRender(!isRender)

            sessionStorage.setItem('userDetails', JSON.stringify(response.data.data))
        } catch (error: any) {
            toast.error(error.response.data?.message)
        }
    }

    return (
        <>
            <div className="pt-12 md:pt-14 w-full h-full flex flex-col sm:px-8">
                <div className="flex flex-col sm:flex-row gap-3 h-full sm:pt-4">
                    <div className="w-full md:w-1/3 lg:w-1/4 sm:h-full flex flex-col gap-3">
                        <div className={`${editProfile?'block':'hidden sm:block'}`}>
                            <div className="w-full h-32 sm:h-16 bg-gray-50 sm:bg-white sm:border flex flex-col sm:flex-row items-center justify-center sm:justify-start sm:gap-3 sm:px-4">
                                <p className='absolute cursor-pointer block sm:hidden left-2 top-16' onClick={()=>setEditProfile(false)}><BsArrowLeft/></p>
                                <div className="w-12 min-w-[48px] h-12 rounded-full border">
                                    <img className='rounded-full' src={userDetails.gender === 'FEMALE' ? avatarF : avatarM} alt="" />
                                </div>
                                <div className="text-sm">
                                    <span className='text-xs font-medium hidden md:block'>Hello</span>
                                    <p className='text-xl md:text-base font-medium text-gray-600 truncate'>{userDetails.name}</p>
                                </div>
                            </div>
                        </div>
                        <div className={`${editProfile?'hidden sm:block':'block'}`}>
                         <div className="w-full sm:border  flex flex-col gap-2">
                            <Details />
                            <div className="px-3 bg-slate-50 sm:bg-white shadow-sm ">
                                <p className='text-lg'>Personal deatails</p>
                                <div onClick={()=>setEditProfile(true)} className="px-2 py-1 hover:bg-gray-100 cursor-pointer w-full flex items-center justify-between">
                                    <div className=" flex items-center gap-2">
                                        <AiOutlineUser /> <p className='text-sm'>Edit Profile</p>
                                    </div>
                                    < MdKeyboardArrowRight />
                                </div>
                                <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer w-full flex items-center justify-between">
                                    <div className=" flex items-center gap-2">
                                        <BiCurrentLocation /> <p className='text-sm'>Saved Addresses</p>
                                    </div>
                                    < MdKeyboardArrowRight />
                                </div>
                            </div>
                        </div>
                        </div>
                      
                    </div>
                    <div className={`${editProfile?'block':'hidden sm:block'} w-full md:w-2/3 lg:w-[75%] sm:border sm:h-full`}>
                        <Formik
                            initialValues={initialValues}
                            //   validate={validate}
                            onSubmit={onsubmit}>
                            <Form className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="relative z-0 w-full mb-5 group">
                                    <Field disabled={edit} type="text" autoComplete="off" name="name" id="name"
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
                                    <Field disabled={edit} type="text" autoComplete="off" name="email" id="email"
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
                                    <Field disabled={edit} type="number" autoComplete="off" name="phone" id="phone"
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
                                            <Field disabled={edit} id="male" value='MALE' name="gender" type="radio" className="h-3 w-3 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                            <label htmlFor="male" className="block text-sm font-medium leading-6 text-gray-600">Male</label>
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            <Field disabled={edit} id="female" value='FEMALE' name="gender" type="radio" className="h-3 w-3 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                            <label htmlFor="female" className="block text-sm font-medium leading-6 text-gray-600">Female</label>
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            <Field disabled={edit} id="other" value='OTHER' name="gender" type="radio" className="h-3 w-3 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                            <label htmlFor="other" className="block text-sm font-medium leading-6 text-gray-600">Other</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4 ">
                                    {edit ? <span onClick={() => setEdit(false)} className='border block md:inline-block text-center cursor-pointer font-medium px-6 py-2 bg-blue-500 text-sm text-white'>Edit Profile</span> :
                                        <button type='submit' className='border w-full md:w-auto font-medium px-10 text-sm py-1.5 bg-blue-500 text-white'>Save</button>}
                                </div>
                            </Form>
                        </Formik>
                    </div>
                   
                </div>
            </div>
        </>
    );
}

export default Profile;
