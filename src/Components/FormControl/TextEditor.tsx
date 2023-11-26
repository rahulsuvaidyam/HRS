import { ErrorMessage, Field } from 'formik';
import type { FC } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TextEditorProps {
    label: string
    name: string
    required?: boolean
    disabled?:boolean
}

const TextEditor: FC<TextEditorProps> = ({ label, name, required = true ,disabled}) => {
    const handleEditorContainerClick = (event:any) => {
        event?.stopPropagation();
    };
    return (
        <div className="relative mb-14 pt-3 z-20 w-full" onClick={handleEditorContainerClick}>
            <Field name={name} disabled={disabled}>
                {({ field }: any) => <ReactQuill value={field?.value} onChange={field?.onChange(field?.name)} className="h-36" />}
            </Field>
            <label htmlFor={name} className="peer-focus:font-medium absolute text-gray-400  font-normal text-smduration-300 transform -translate-y-4 scale-75 top-1.5 left-2 bg-skin-fill-outlet z-10 origin-[0] peer-focus:left-2 peer-focus:text-secondary peer-focus:dark:text-seconborder-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">{label} {required === true ? <span className="text-red-500">*</span> : null}</label>
            <span className="text-red-500 text-xs "><ErrorMessage name={name} /></span>
        </div>
    );
}

export default TextEditor;