import { Field } from 'formik';
import type { FC } from 'react';

interface GenderProps {
    disabled?: boolean
}

const Gender: FC<GenderProps> = ({ disabled = false }) => {
    return (
        <>
            <div>
            <label htmlFor="gender" className='text-gray-500 text-sm font-medium'>Gender</label>
            <div className="flex gap-x-2">
                <div className="flex items-center gap-x-2">
                    <Field disabled={disabled} id="male" value='MALE' name="gender" type="radio" className="h-3 w-3 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                    <label htmlFor="male" className="block text-sm font-medium leading-6 text-gray-600">Male</label>
                </div>
                <div className="flex items-center gap-x-2">
                    <Field disabled={disabled} id="female" value='FEMALE' name="gender" type="radio" className="h-3 w-3 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                    <label htmlFor="female" className="block text-sm font-medium leading-6 text-gray-600">Female</label>
                </div>
                <div className="flex items-center gap-x-2">
                    <Field disabled={disabled} id="other" value='OTHER' name="gender" type="radio" className="h-3 w-3 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                    <label htmlFor="other" className="block text-sm font-medium leading-6 text-gray-600">Other</label>
                </div>
            </div>
            </div>
        </>
    );
}

export default Gender;
