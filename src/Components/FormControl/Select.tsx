import { Field } from 'formik';
import type { FC } from 'react';

interface SelectProps {
    name: string
    label: string
    disabled?: boolean
    array: any[]
}

const Select: FC<SelectProps> = ({ name, label, disabled = false ,array=[]}) => {
    return (
        <>
            <div className="relative z-0 w-full mb-5 group">
                <Field disabled={disabled} as="select" name={name} id={name}
                    className="block pt-2 pb-1 px-0 w-full text-sm
                        text-gray-600 bg-transparent border-0 border-b border-gray-300 appearance-none 
                            focus:outline-none focus:ring-0 focus:border-blue-400
                            peer" placeholder=" " >
                    <option value="">Select {label}</option>
                    {array?.map((item:any)=>(
                        <option key={item._id} value={item._id}>{item.name}</option>
                    ))

                    }
                </Field>

            </div>
        </>
    );
}

export default Select;
