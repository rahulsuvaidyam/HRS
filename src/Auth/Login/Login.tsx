import { type FC } from 'react';
import Button from '../../Component/Button';

interface LoginProps { }

const Login: FC<LoginProps> = () => {

    return (
        <>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" autoComplete="off" name="username" id="username"
                        className="block py-2.5 px-0 w-full text-sm
                        text-gray-400 bg-transparent border-0 border-b border-gray-300 appearance-none 
                            focus:outline-none focus:ring-0 focus:border-blue-400
                            peer" placeholder=" " />
                    <label htmlFor="username" className="peer-focus:font-medium absolute  text-gray-400 
                        duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:scale-75 peer-focus:-translate-y-6">
                        Enter Email/Mobile number
                    </label>
                </div>
                <div className="relative z-0 w-full  group">
                    <input type="password" autoComplete="off" name="password" id="password"
                        className="block py-2.5 px-0 w-full text-sm
                        text-gray-400 bg-transparent border-0 border-b border-gray-300 appearance-none 
                            focus:outline-none focus:ring-0 focus:border-blue-400
                            peer" placeholder=" " />
                    <label htmlFor="password" className="peer-focus:font-medium absolute  text-gray-400 
                        duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:scale-75 peer-focus:-translate-y-6">
                        Password
                    </label>
                </div>
            </div>
            <div className="px-6 pb-4">
                <Button title='Sign In' px='3' py='1' />
            </div>
        </>
    );
}

export default Login;
