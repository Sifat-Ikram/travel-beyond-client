import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useDivision from '../../hooks/useDivision';

const Places = () => {
    const [division, loading] = useDivision();
    const { id } = useParams();

    const filteredPlaces = division.filter(div => div._id === id);
    console.log(filteredPlaces);

    if (!filteredPlaces[0]) {
        return <span className="loading loading-dots loading-lg"></span>;
    }

    console.log(filteredPlaces[0].places);

    return (
        <div className='mt-10 space-y-8'>
            <div>
                <img src={filteredPlaces[0].image} className='w-full h-[400px]' alt="" />
            </div>
            <div className='space-y-8'>
                <h1 className='text-2xl font-semibold'>Division Name: {filteredPlaces[0].title}</h1>
                <h1 className='grid grid-cols-1 gap-5 text-2xl font-semibold lg:grid-cols-3 md:grid-cols-2'>Places: {
                    filteredPlaces[0].places.map(place => <Link to={`/details/${place.id}`} key={place.id}>
                        <div className="shadow-xl card w-80 bg-base-100">
                            {/* <figure className="px-10 pt-10">
                            <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl" />
                        </figure> */}
                            <div className="items-center text-center card-body">
                                <h2 className="card-title">{place.title}</h2>
                            </div>
                        </div>
                    </Link>)
                }</h1>
            </div>
        </div>
    );
};

export default Places;