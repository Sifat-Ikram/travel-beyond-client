import useDivision from '../../hooks/useDivision';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const DivisionDetails = () => {
    const { id } = useParams();
    const [division] = useDivision();
    const axiosPublic = useAxiosPublic();
    const { data: tours = [] } = useQuery({
        queryKey: ['tour._id'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tour');
            return res.data;
        }
    })

    if (!division) {
        return <span className="loading loading-dots loading-lg"></span>;
    }

    const filteredDivision = division.find(div => div._id === id);

    const selectedDivision = tours.filter(tour => tour.division === filteredDivision.title);

    return (
        <div className='space-y-10'>
            <Navbar></Navbar>
            <div className='w-4/5 mx-auto'>
                <img src={filteredDivision.image} alt={filteredDivision.title} className='h-[350px] w-11/12' />
                <h1 className='mt-20 text-4xl font-semibold'>About {filteredDivision.title}:</h1>
                <p className='text-lg'>{filteredDivision.description}</p>
            </div>
            <div className='w-4/5 mx-auto mt-10'>
                <h1 className='text-4xl font-semibold'>Tours packages in this area</h1>
                <div className='w-11/12 mx-auto mt-5'>
                    <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
                    {
                        selectedDivision.map(tour => <div className="card w-60 bg-base-100 shadow-xl border-2" key={tour._id}>
                            <figure className="px-10 pt-10">
                                <img src={tour.image} alt="Shoes" className="rounded-xl w-40" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{tour.destination}</h2>
                                <p> District: {tour.district}</p>
                                <Link to={`/tourDetails/${tour._id}`}>
                                        <button className='btn btn-outline border-[#47FC22] text-[#47FC22] hover:bg-[#47FC22] hover:border-[#47FC22] hover:text-white'>View Details</button>
                                    </Link>
                            </div>
                        </div>)
                    }
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DivisionDetails;