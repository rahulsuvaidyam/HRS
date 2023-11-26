import { Form, Formik } from 'formik';
import { useState, type FC, useContext } from 'react';
import Text from '../../Components/FormControl/Text';
import Number from '../../Components/FormControl/Number';
import Gender from '../../Components/FormControl/Gender';
import Http from '../../Services/Http';
import { toast } from 'react-toastify';
import { DataContext } from '../../Context/DataProvider';

interface PersonalProps { }

interface FormValues {
    name: string;
    email: string;
    phone: string;
    gender: string,
}
const Personal: FC<PersonalProps> = () => {

    const [edit, setEdit] = useState<boolean>(true)
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
            <p className='text-xl pt-2 font-medium'>Personal Information</p>
            <Formik
                initialValues={initialValues}
                //   validate={validate}
                onSubmit={onsubmit}>
                <Form className="bg-white  pb-4 pt-5 sm:pb-4">
                    <Text disabled={edit} name='name' label='Enter Name' />
                    <Text disabled={edit} name='email' label='Enter Email' />
                    <Number disabled={edit} name='phone' label='Enter Phone Number' length='10'/>
                    <Gender disabled={edit} />
                    <div className="pt-4 ">
                        {edit ? <span onClick={() => setEdit(false)} className='border block md:inline-block text-center cursor-pointer font-medium px-6 py-2 bg-primary text-sm text-white'>Edit Profile</span> :
                            <button type='submit' className='border w-full md:w-auto font-medium px-10 text-sm py-1.5 bg-primary text-white'>Save</button>}
                    </div>
                </Form>
            </Formik>
        </>
    );
}

export default Personal;
