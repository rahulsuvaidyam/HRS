import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';

interface ImageProps {
    onImageUpload: (file: File) => void;
    disabled?:boolean
    message:string
}

const Image: React.FC<ImageProps> = ({ onImageUpload ,disabled,message}) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        onImageUpload(file);
    }, [onImageUpload]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        disabled:disabled,
    });

    return (
        <div {...getRootProps()} className="flex items-center justify-center w-full h-32">
            <input {...getInputProps()} />
            <label className="flex flex-col relative items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-skin-fill-dragInput  hover.bg-gray-100 ">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <AiOutlineCloudUpload className='text-gray-600 font-semibold text-xl' />
                    <p className="mb-2 text-sm text-gray-500 flex items-center justify-center"><span className="font-semibold text-center">Click or drag to upload</span></p>
                    <p className="mb-2 text-sm text-gray-500 flex items-center justify-center"><span className="font-semibold text-center">{message} image upload</span></p>
                </div>
            </label>
        </div>
    );
};

export default Image;