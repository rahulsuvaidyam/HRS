import { useContext, useRef, type FC, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { DataContext } from '../Context/DataProvider';
import Login from './Login/Login';
import Register from './Register/Register';

interface AuthProps {}

const Auth: FC<AuthProps> = () => {
    const [open, setOpen] = useState<boolean>(false)
    const { logInPage, setLogInPage } = useContext(DataContext)

    const cancelButtonRef = useRef(null)
    return (
        <>
          <Transition.Root show={logInPage} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setLogInPage}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-2 sm:px-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  w-full sm:max-w-lg">
                                    <div className="flex justify-between items-center gap-3 px-6 py-3">
                                        <button onClick={()=>setOpen(false)} className={`${open?'bg-gray-200 text-gray-700':'bg-blue-500 text-white'} rop-shadow-lg px-6 rounded-md py-1 text-sm w-1/2  font-semibold`}>Sign In</button>
                                        <button onClick={()=>setOpen(true)} className={`${open?'bg-blue-500 text-white':'bg-gray-200 text-gray-700'} rop-shadow-lg px-6 rounded-md py-1 text-sm w-1/2  font-semibold`}>Sign Up</button>
                                    </div>
                                    {open?<Register/>: <Login/>}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}

export default Auth;
