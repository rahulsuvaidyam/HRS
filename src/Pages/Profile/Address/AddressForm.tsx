import { Form, Formik } from 'formik';
import { useState, type FC, useContext, useEffect } from 'react';
import Text from '../../../Components/FormControl/Text';
import Number from '../../../Components/FormControl/Number';
import Http from '../../../Services/Http';
import { toast } from 'react-toastify';
import { DataContext } from '../../../Context/DataProvider';
import Select from '../../../Components/FormControl/Select';

interface AddressAddressFormProps {
    editData?: any,
    setAddAddress?: any
}
interface FormValues {
    name: string;
    phone: string;
    pin_code: string;
    state: string;
    district: string;
    status: string;
    house_name: string,
    road_name: string,
    land_mark: string,
}
const AddressForm: FC<AddressAddressFormProps> = ({ editData, setAddAddress }) => {

    const [state, setState] = useState<any[]>([])
    const [district, setDistrict] = useState<any[]>([])
    const { setIsRender, isRender } = useContext(DataContext);

    const initialValues: FormValues = {
        name: editData?.name || "",
        phone: editData?.phone || "",
        pin_code: editData?.pin_code || "",
        state: editData?.state?._id || "",
        status: editData?.status || "",
        district: editData?.district?._id || "",
        house_name: editData?.house_name || "",
        road_name: editData?.road_name || "",
        land_mark: editData?.land_mark || "",
    };
    const onsubmit = async (values: any) => {
        if (editData?.name) {
            try {
                values['_id'] = editData._id
                const response = await Http({
                    url: '/address',
                    method: 'put',
                    data: values
                });
                if (response.data.code === 'SUCCESS_200') {
                    toast.success(response.data?.message)
                    if (setAddAddress) {
                        setAddAddress(false);
                    }
                    setIsRender(!isRender)
                }
            } catch (error: any) {
                console.log(error)
                toast.error(error.response.data?.message)
            }
        } else {
            try {
                const response = await Http({
                    url: '/address',
                    method: 'post',
                    data: values
                });
                if (response.data.code === 'SUCCESS_200') {
                    toast.success(response.data?.message)
                    if (setAddAddress) {
                        setAddAddress(false);
                    }
                    setIsRender(!isRender)
                }
            } catch (error: any) {
                toast.error(error.response.data?.message)
            }
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await Http({
                    url: '/state',
                    method: 'get',
                });
                setState(response.data?.data)
                // setIsRender(!isRender)

            } catch (error: any) {
                toast.error(error.response.data?.message)
            }
            try {
                const response = await Http({
                    url: '/district',
                    method: 'get',
                });
                setDistrict(response.data?.data)
                // setIsRender(!isRender)
            } catch (error: any) {
                toast.error(error.response.data?.message)
            }
        }
        getData()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Formik
                initialValues={initialValues}
                //   validate={validate}
                onSubmit={onsubmit}>
                <Form className="bg-white  pb-4 pt-5 sm:pb-4">
                    <Text name='name' label='Enter Name' />
                    <div className="grid grid-cols-2 gap-x-4">
                        <Number name='phone' label='Enter Phone Number' />
                        <Number name='pin_code' label='Enter Pin Code' />
                        <Select label='State' name='state' array={state ?? []} />
                        <Select label='District' name='district' array={district ?? []} />
                    </div>
                    <Select label='Status' name='status' array={[
                        { _id: 'active', name: 'Active' },
                        { _id: 'inactive', name: 'Inactive' },
                    ]} />
                    <Text name='house_name' label='Enter House Name' />
                    <Text name='road_name' label='Enter Road Name' />
                    <Text name='land_mark' label='Enter Landmark' />
                    <div className="pt-4 flex gap-3">
                        <button type='submit' className='border w-full md:w-auto font-medium px-10 text-sm py-1.5 bg-primary text-white'>{editData?.name ? 'Update Address' : 'Create Address'}</button>
                        <button onClick={()=>setAddAddress(false)} type='button' className='border w-full md:w-auto font-medium px-10 text-sm py-1.5 bg-secondary text-white'>Cancel</button>
                    </div>
                </Form>
            </Formik>
        </>
    );
}

export default AddressForm;
