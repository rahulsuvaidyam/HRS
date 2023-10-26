import type { FC } from 'react';

interface ButtonProps {
    title:string,
    w?:string,
    h?:string,
    px:string,
    py:string,
    bg?:string,
    text?:string,
    size?:string,
}

const Button: FC<ButtonProps> = (
    {title,w='auto',h='auto',px,py,bg='gray-100',text='gray-700',size='sm'}) => {
    return (
        <>
         <button 
         className={`border rounded-md 
         w-${w}
         h-${h} 
         px-${px} 
         py-${py}
         bg-${bg}
         text-${text}
         text-${size}
         `}>{title}</button>
        </>
    );
}

export default Button;
