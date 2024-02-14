import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AllTour = () => {
    const [ value, setValue ] = useState([]);
    const axiosPublic = useAxiosPublic();
    const { data: tours = [] } = useQuery({
        queryKey: ['tour._id'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tour');
            return res.data;
        }
    })

    const handleSearch = e => {
        e.preventDefault();
        const form = e.target;
        const search = form.search.value;
        setValue(search);
    }

    const getFilteredDistrict = () => {
        if (!value) {
            return tours;
        }
        else{
            return tours.filter(tour => tour.district.toLowerCase().includes(value));
        }
    }

    const filteredTour = getFilteredDistrict();

    return (
        <div className='space-y-10'>
            <Navbar></Navbar>
            <form onSubmit={handleSearch} className='flex justify-center'>
            <input type="text" name='search' placeholder="Type yoour destination" className="input input-bordered w-full max-w-xs" />
            <button className='bg-[#47FC22] btn hover:bg-[#47FC22] text-white'>Search</button>
            </form>
            <div className='w-5/6 mx-auto space-y-4'>
                <h1 className='text-5xl font-bold'>Select your tour</h1>
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-5'>
                    {
                        filteredTour.map(tour => <Link key={tour._id} to={`/tourDetails/${tour._id}`}><div className="card lg:card-side bg-base-100 shadow-xl">
                            <figure><img src={tour.image} className='w-60 h-60' alt="Album" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{tour.destination}</h2>
                                <h1><span className='text-lg font-semibold'>Tour date:</span> {tour.tour_date}</h1>
                                <h3><span className='text-lg font-semibold'>Booking Deadline: </span>{tour.booking_date}</h3>
                                <h4><span className='text-lg font-semibold'>Price:</span> ${tour.price}</h4>
                            </div>
                        </div></Link>)
                    }
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AllTour;