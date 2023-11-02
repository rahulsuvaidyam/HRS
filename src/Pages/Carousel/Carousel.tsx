import type { FC } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

interface CarouselsProps { }

const Carousels: FC<CarouselsProps> = () => {
    return (
        <>
            <div className="w-full h-56 md:h-72">
                <Carousel
                    showArrows={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    dynamicHeight={true}
                    showThumbs={false}
                >
                    <div >
                        <img className='h-56 md:h-72' src='https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Cake-Banner_Desk-41023.jpg' alt=''/>
                    </div>
                    <div >
                        <img className='h-56 md:h-72'  src='https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Karwa-Chauth_Desktop-Banner_26oct.jpg' alt='' />
                    </div>
                    <div >
                        <img className='h-56 md:h-72'  src='https://www.fnp.com/assets/images/custom/new-desk-home/hero-banners/Cake-Banner_Desk-41023.jpg' alt=''/>
                    </div>
                    
                </Carousel>
            </div>
        </>
    );
}

export default Carousels;
