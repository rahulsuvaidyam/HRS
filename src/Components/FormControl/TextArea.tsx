import { Field } from 'formik';
import type { FC } from 'react';

interface TextAreaProps { 
    name: string
    label: string
    disabled?: boolean
}

const TextArea: FC<TextAreaProps> = ({name,label,disabled=false}) => {
    return (
        <>
            <div className="relative z-0 w-full mb-5 group">
                <Field disabled={disabled} as="textarea" name={name} id={name}
                    className="block pt-2 pb-1 px-0 w-full text-sm
                        text-gray-600 bg-transparent border-0 border-b border-gray-300 appearance-none 
                            focus:outline-none focus:ring-0 focus:border-orange-400
                            peer" placeholder=" " />
                <label htmlFor={name} className="font-medium absolute  text-gray-500 
                        duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:scale-75 peer-focus:-translate-y-6">
                    {label}
                </label>

            </div>
        </>
    );
}

export default TextArea;
