import type { CSSProperties, FC } from 'react';
import RingLoader from "react-spinners/RingLoader";

interface SpinnerProps {
    loading:boolean
}
const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
const Spinner: FC<SpinnerProps> = ({loading}) => {
    return (
        <>
        <div className="w-full h-full inset-0 bg-gray-200 bg-opacity-40 transition-opacity flex items-center justify-center">
        <RingLoader color="#111827" 
         loading={loading}
         cssOverride={override}
         size={50}
         aria-label="Loading Spinner"
         data-testid="loader"/>
         
        </div>
        </>
    );
}

export default Spinner;
