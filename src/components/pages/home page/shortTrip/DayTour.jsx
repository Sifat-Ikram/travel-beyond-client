import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";


const DayTour = () => {
    const axiosPublic = useAxiosPublic();
    const { data: tours = [] } = useQuery({
        queryKey: ['tour._id'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tour');
            return res.data;
        }
    })
    const filteredTour = tours && tours.length > 0 ? tours.filter(tour => tour.duration === "2 days") : [];

    return (
        <div className="space-y-10">
            <h1 className='text-3xl font-bold'>Popular Trips</h1>
            <div>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={0}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                    style={{ '--swiper-pagination-color': 'black' }}
                >
                    {
                        filteredTour.map(tour => <SwiperSlide key={tour.package_id}>
                            <div className="h-[400px] gap-5 border-2 border-solid rounded-xl shadow-xl">
                                <figure className="px-6 pt-6">
                                    <img src={tour.image} alt={tour.destination} className="rounded-xl h-40" />
                                </figure>
                                <div className="card-body">
                                    <p>Date: {tour.tour_date}</p>
                                    <h2 className="card-title">{tour.destination}</h2>
                                    <div className="flex justify-between">
                                        <p>District: {tour.district}</p>
                                        <p>{tour.duration}</p>
                                    </div>
                                    <Link to={`/tourDetails/${tour._id}`}>
                                        <button className='btn btn-outline border-[#47FC22] text-[#47FC22] hover:bg-[#47FC22] hover:border-[#47FC22] hover:text-white'>View Details</button>
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default DayTour;