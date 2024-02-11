import useDivision from '../../hooks/useDivision';
import { useParams } from 'react-router-dom';
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';
// import useAxiosPublic from '../../hooks/useAxiosPublic';
// import { useQuery } from '@tanstack/react-query';

const DivisionDetails = () => {
    const { id } = useParams();
    const [division] = useDivision();
    // const axiosPublic = useAxiosPublic();

    if (!division) {
        return <span className="loading loading-dots loading-lg"></span>;
    }

    const filteredDivision = division.find(div => div._id === id);

    // const { data: tours = [] } = useQuery(['tour', id], async () => {
    //     const res = await axiosPublic.get(`/tour/${id}`);
    //     return res.data;
    // });
    // console.log(tours);
    console.log(filteredDivision);

    return (
        <div className='space-y-10'>
            <Navbar></Navbar>
            <div className='w-11/12 mx-auto'>
                <img src={filteredDivision.image} alt={filteredDivision.title} className='h-[350px] w-11/12' />
                <h1 className='mt-20 text-4xl font-semibold'>About {filteredDivision.title}:</h1>
                <p className='text-lg'>{filteredDivision.description}</p>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DivisionDetails;