import React from 'react';
import useDivision from '../../hooks/useDivision';
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';
import { Link } from 'react-router-dom';

const Destinations = () => {

    const [division] = useDivision();

    if (!division) {
        return <span className="loading loading-dots loading-lg"></span>;
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className='w-5/6 mx-auto'>
                <h1>Places to visit</h1>
                <div className='grid grid-cols-1 gap-10 lg:grid-cols-3 md:grid-cols-2'>
                    {
                        division.map(div => <div key={div._id} className="shadow-xl card bg-base-100">
                            <figure className="px-10 pt-10">
                                <img src={div.image} alt="Shoes" className="rounded-xl w-96 h-60" />
                            </figure>
                            <div className="items-center text-center card-body">
                                <h2 className="card-title">{div.title}</h2>
                                <div className="card-actions">
                                    <Link to={`/divisionDetails/${div._id}`}>
                                        <button className="btn bg-[#47FC22] hover:bg-[#47FC22] rounded-md px-3 text-white font-bold">Details</button>
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

export default Destinations;