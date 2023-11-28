import { useState, CSSProperties, type FC, useRef, useEffect, Fragment } from 'react';
import { BiSearch } from 'react-icons/bi';
import { RingLoader } from 'react-spinners';
import Http from '../../Services/Http';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'
import { GoArrowUpRight } from 'react-icons/go';
import { IoIosArrowRoundBack } from 'react-icons/io';

interface GlobalSearchProps { }

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const GlobalSearch: FC<GlobalSearchProps> = () => {
    const [searchValue, setSearchValue] = useState<any>()
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [searchLoader, setSearchLoader] = useState<boolean>(false)
    const [searchPopup, setSearchPopup] = useState<boolean>(false)

    const cancelButtonRef = useRef(null)

    const Search = (e: any) => {
        setSearchValue(e)
    }

    useEffect(() => {
        const getSearch = async () => {
            try {
                const response = await Http({
                    url: '/search',
                    method: 'get',
                    data: { name: searchValue }
                });
                setSearchLoader(false)
                setSearchResults(response?.data?.data)
            } catch (error: any) {
                console.log(error.response?.data?.message)
            }
        }
        if (searchValue) {
            setSearchLoader(true)
        }
        if (searchPopup) {
            getSearch()
        }
        // eslint-disable-next-line
    }, [searchValue])

    return (
        <>
            <div className="w-3/5 md:w-3/6 relative">
                <div onClick={() => setSearchPopup(true)} className='outline-none w-full cursor-text bg-white text-sm font-medium text-gray-700 py-1.5 rounded-sm md:py-1.5 pl-7 pr-2' >Search for products</div>
                <BiSearch className='text-tatary absolute left-2 top-2' />

                <Transition.Root show={searchPopup} as={Fragment}>
                    <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setSearchPopup}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed h-full inset-0 top-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-50 top-0 md:top-6 w-screen h-full">
                            <div className="flex h-full justify-center  text-center  sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel className="relative transform overflow-hidden overflow-y-auto scrollbar-none rounded-none md:rounded-lg  md:px-1 bg-white text-left shadow-xl transition-all sm:my-8 w-full md:max-w-lg">
                                        <div className=" h-12 shadow-sm flex items-center w-full bg-white sticky top-0 px-2 md:px-1">
                                            <IoIosArrowRoundBack onClick={()=>setSearchPopup(false)} className='text-4xl block md:hidden' />
                                            <input defaultValue={searchValue} onChange={(e) => Search(e.target.value)} className='outline-none w-full  text-sm font-medium bg-slate-200 text-gray-700 py-1.5 rounded-md md:py-1.5 pl-7 pr-2' placeholder='Search for products' type="search" />
                                            <div className="absolute left-12 md:left-3 top-4">
                                                {searchLoader ?
                                                    <RingLoader color="#36d7b7"
                                                        loading={searchLoader}
                                                        cssOverride={override}
                                                        size={16}
                                                        aria-label="Loading Spinner"
                                                        data-testid="loader" /> : <BiSearch className='text-gray-700' />}
                                            </div>
                                        </div>
                                        <div className="bg-white w-full px-2 md:px-0 pt-2 pb-4 sm:pb-4 flex flex-col gap-2">
                                            {searchResults?.length >= 1 ?
                                                searchResults?.map((e: any) => (
                                                    <Link key={e?._id} onClick={() => setSearchPopup(false)} to={'/productdetails/' + e._id} className="flex px-2 items-center justify-between hover:bg-gray-200">
                                                        <div className="flex items-center gap-2 cursor-pointer">
                                                            <img className='h-10 rounded-sm' src={e?.images[0]?.url} alt="" />
                                                            <div className="">
                                                                <p className='text-sm'>{e?.name}</p>
                                                                <p className='text-[10px] font-medium text-primary'>in {e?.category?.name}</p>
                                                            </div>
                                                        </div>
                                                        <GoArrowUpRight />
                                                    </Link>
                                                )) :
                                                <div className='text-center text-sm h-56'>
                                                    <p className='pt-5'>No results found!</p>
                                                </div>}
                                        </div>

                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            </div>
        </>
    );
}

export default GlobalSearch;
