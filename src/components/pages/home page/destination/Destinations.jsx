import useDivision from "../../../hooks/useDivision";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";

const Destinations = () => {
    const [division] = useDivision();

    if (!division) {
        return <span className="loading loading-dots loading-lg"></span>;
    }
    
    return (
        <div>
            <h1 className="text-4xl font-bold mb-10 text-center">Destinations</h1>
            <div>
                <Swiper
                    effect={'coverflow'}
                    slidesPerView={3}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    autoplay={{
                        delay: 5500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                    className="mySwiper"
                >
                    {
                        division.map(div => <Link key={div._id}>
                            <SwiperSlide>
                                <div style={{
                                    backgroundImage: `url(${div.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}>
                                    <div className="hero-overlay bg-opacity-50 w-full"></div>
                                    <div className="pl-5 pb-4">
                                        <div className="pt-32 w-1/3">
                                            <Link to={`/divisionDetails/${div._id}`}>
                                                <h1 className="text-xl left-2 text-white font-bold">{div.title}</h1>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Link>
                        )
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Destinations;