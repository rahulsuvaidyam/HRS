import { Field } from 'formik';
import type { FC } from 'react';

interface PasswordProps {
    name: string
    label: string
    disabled?: boolean
}

const Password: FC<PasswordProps> = ({ name, label, disabled = false }) => {
    return (
        <>
            <div className="relative z-0 w-full mb-5 group">
                <Field disabled={disabled} type="password" name={name} id={name}
                    className="block py-2.5 px-0 w-full text-sm
                        text-gray-600 bg-transparent border-0 border-b border-gray-300 appearance-none 
                            focus:outline-none focus:ring-0 focus:border-blue-400
                            peer" placeholder=" " />
                <label htmlFor={name} className="font-medium absolute  text-gray-500 
                        duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:scale-75 peer-focus:-translate-y-6">
                    {label}
                </label>
            </div>
        </>
    );
}

export default Password;
