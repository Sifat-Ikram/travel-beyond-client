import { useContext } from 'react';
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
const TourDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const { data: tours = [], refetch } = useQuery({
        queryKey: ['tour._id'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tour');
            return res.data;
        }
    })

    if (!tours) {
        return <span className="loading loading-dots loading-lg"></span>
    }

    const filteredTour = tours.find(tour => tour._id === id);

    if (!filteredTour) {
        return <span className="loading loading-dots loading-lg"></span>
    }

    console.log(filteredTour);
    const { destination, district, duration, package_id, description, tour_date, booking_date, division, image, price, highlights, includes } = filteredTour;
    const handleApply = () => {
        if (user && user.email) {

            const cartItem = {
                email: user.email,
                package_id: package_id,
                duration: duration,
                district: district,
                division: division,
                destination: destination,
                description: description,
                tour_date: tour_date,
                booking_date: booking_date,
                image: image,
                price: price
            }
            Swal.fire({
                title: "Are you sure, you want to book this package?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosPublic.post('/bookings', cartItem)
                        .then(res => {

                            if (res.data.insertedId) {

                                refetch();
                            }
                        })
                    Swal.fire({
                        title: "Congratulations!",
                        text: "this package is booked",
                        icon: "success"
                    });
                }
            });

        }
        else {
            Swal.fire({
                title: "You are not signed in",
                text: "Please sign in to book event",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "sign in"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/signIn');
                }
            });
        }
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className='w-5/6 mx-auto mt-10 space-y-10'>
                <figure className="w-4/5 mx-auto">
                    <img src={image} alt={destination} />
                </figure>
                <h1 className='text-5xl font-semibold text-center'>{destination}</h1>
                <div className='space-y-5'>
                    <h1> <span className='font-bold'>Division: </span>{division} </h1>
                    <h1> <span className='font-bold'>Last Booking date: </span> {booking_date} </h1>
                    <h1> <span className='font-bold'>Places to visit: {highlights}</span></h1>
                    <h1> <span className='font-bold'>Price: </span>${price} Taka</h1>
                    <h1> <span className='font-bold'>Included: {includes} </span></h1>
                    <h1> <span className='font-bold'>Tour Details: </span>{description} </h1>
                </div>
                <div className='flex justify-end'>
                    <button onClick={handleApply} className='px-3 py-2 uppercase bg-[#47FC22] rounded-md text-white font-bold text-lg'>Book Now</button>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default TourDetails;