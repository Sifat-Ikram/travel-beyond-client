import React, { useEffect, useState } from 'react';
import useDivision from '../../../hooks/useDivision';
import { Link } from 'react-router-dom';

const Divisions = () => {

    const [division] = useDivision();

    return (
        <div className='space-y-10'>
            <h1 className='text-3xl font-bold text-center'>Places you can explore with us in Bangladesh</h1>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                {
                    division.map(div => <Link key={div._id} to={`/places/${div._id}`}>
                        <div className="shadow-xl h-60 card w-80 image-full">
                        <figure><img src={div.image} alt={div.title} className='w-full' /></figure>
                        <div className="flex items-center justify-center card-body">
                            <h2 className="text-4xl card-title">{div.title}</h2>
                        </div>
                    </div>
                    </Link>
                    )
                }
            </div>
        </div>
    );
};

export default Divisions;