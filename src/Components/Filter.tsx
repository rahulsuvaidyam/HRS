import { useState, type FC, useEffect } from 'react';
import { BsPlus } from 'react-icons/bs'
import { BiMinus } from 'react-icons/bi'
import Http from '../Services/Http';
import { toast } from 'react-toastify';
import { Disclosure } from '@headlessui/react'

interface FilterProps { }


const Filter: FC<FilterProps> = () => {
    const [category, setcategory] = useState<any>([])
    //    console.log(category)
    useEffect(() => {
        const getCategory = async () => {
            try {
                const response = await Http({
                    url: '/category',
                    method: 'get',
                });
                setcategory(response?.data?.data)
            } catch (error: any) {
                toast.error(error.response?.data?.message)
            }
        }
        getCategory();
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className="hidden md:block md:w-72 h-full bg-gray-100 fixed top-0 pt-12 md:pt-14">
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                    {({ open }) => (
                        <>
                            <h3 className="-my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between px-3 py-2 text-sm text-gray-400 hover:text-gray-500">
                                    <span className="font-medium text-gray-900">CATEGORY</span>
                                    <span className="ml-6 flex items-center">
                                        {open ? (
                                            <BiMinus className="h-5 w-5" aria-hidden="true" />
                                        ) : (
                                            <BsPlus className="h-5 w-5" aria-hidden="true" />
                                        )}
                                    </span>
                                </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-3">
                                <div className="space-y-2 px-4">
                                    {category.map((e: any) => (
                                        <div key={e._id} className="flex items-center">
                                            <input
                                                id={e._id}
                                                name={e._id}
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <label
                                                htmlFor={e._id}
                                                className="ml-3 text-sm text-gray-600"
                                            >
                                                {e?.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </>
    );
}

export default Filter;
