import React from 'react';
import useDivision from '../../hooks/useDivision';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';

const DivisionDetails = () => {
    const [division] = useDivision();
    const id = useParams();

    if (!division) {
        return <span className="loading loading-dots loading-lg"></span>;
    }

    const filteredDivision = division.find(div => div._id === id.id);

    return (
        <div className='space-y-10'>
            <Navbar></Navbar>
            <div className='w-11/12 mx-auto'>
                <img src={filteredDivision.image} alt={filteredDivision.title} className='h-[350px] w-11/12' />
                <h1 className='mt-20 text-4xl font-semibold'>Division Name: {filteredDivision.title}</h1>
                <h1 className='my-20 text-4xl font-semibold'>Places:</h1>
                <div className='grid grid-cols-1 gap-10 lg:grid-cols-3 md:grid-cols-2'>
                    {
                        filteredDivision.places.map(place => <div key={place.id} className="shadow-xl card bg-base-100">
                            <figure className="px-10 pt-10">
                                <img src={place.image} alt={place.title} className="rounded-xl w-96 h-60" />
                            </figure>
                            <div className="items-center text-center card-body">
                                <h2 className="card-title">{place.title}</h2>
                                <div className="card-actions">
                                    <Link to={`/places/${place.id}`}>
                                        <button className="btn bg-[#47FC22] hover:bg-[#47FC22] rounded-md px-6 text-white font-bold">Tours</button>
                                    </Link>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DivisionDetails;