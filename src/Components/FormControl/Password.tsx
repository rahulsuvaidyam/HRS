import { Field } from 'formik';
import { useState, type FC } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface PasswordProps {
    name: string
    label: string
    disabled?: boolean
}

const Password: FC<PasswordProps> = ({ name, label, disabled = false }) => {
    const [shopPassword, setshopPassword] = useState<boolean>(false)
    return (
        <>
            <div className="relative z-0 w-full mb-4 group ">
                <Field disabled={disabled} type={`${shopPassword?'text':'password'}`} name={name} id={name}
                    className="block py-1.5 px-0 w-full text-sm
                        text-gray-600 bg-transparent border-0 border-b border-gray-300 appearance-none 
                            focus:outline-none focus:ring-0 focus:border-orange-400
                            peer" placeholder=" " />
                <label htmlFor={name} className="text-sm font-medium absolute  text-gray-500 
                        duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:scale-75 peer-focus:-translate-y-5">
                    {label}
                </label>
                <div className="absolute top-4 cursor-pointer font-medium right-3"
                onClick={()=>setshopPassword(!shopPassword)}>{shopPassword?<AiOutlineEyeInvisible/>:<AiOutlineEye/>}</div>
            </div>
        </>
    );
}

export default Password;
