import type { FC, MouseEventHandler } from 'react';

interface ButtonProps {
    title:string,
    w?:string,
    h?:string,
    px?:number,
    py?:number,
    bg?:string,
    text?:string,
    size?:string,
    rounded?:string,
    click?:MouseEventHandler<HTMLButtonElement>,
}

const Button: FC<ButtonProps> = (
    {title,w='auto',h='auto',px=4,py=1,bg='gray-100',text='gray-700',size='sm',click,rounded=''}) => {
    return (
        <>
         <button onClick={click} type='submit'
         className={`border rounded-${rounded} 
         font-medium
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
