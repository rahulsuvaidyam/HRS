import { useEffect, type FC, useContext, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Http from '../../Services/Http';
import { toast } from 'react-toastify';
import { DataContext } from '../../Context/DataProvider';

interface ShowCarouselProps { }

const ShowCarousel: FC<ShowCarouselProps> = () => {
    const [carousel, setcarousel] = useState([])
    const { isRender } = useContext(DataContext)

    useEffect(() => {
        const getCategory = async () => {
            try {
                const response = await Http({
                    url: '/carouselshow',
                    method: 'get',
                });
                // toast.success(response?.data?.message)
                setcarousel(response?.data?.data?.images)

            } catch (error: any) {
                toast.error(error.response?.data?.message)
            }
        }
        getCategory();
        // eslint-disable-next-line
    }, [isRender])
    return (
        <>
            <div className="w-full h-32 md:h-56">
                <Carousel
                    showArrows={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    dynamicHeight={true}
                    showThumbs={false} >
                    {carousel?.map((el: any) => (
                        <div key={el?._id}>
                            <img className='h-32 md:h-56' src={process.env.REACT_APP_API_URL + '/' + el?.url} alt={el?.mimetype} />
                        </div>
                    ))}
                </Carousel>
            </div>
        </>
    );
}

export default ShowCarousel;
