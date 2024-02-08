import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const ManageGuide = () => {

    const axiosPublic = useAxiosPublic();

    const { data: guide = [], refetch } = useQuery({
        queryKey: ["guide._id"],
        queryFn: async () => {
            const res = await axiosPublic.get('/guide');
            return res.data;
        }
    })

    if (!guide) {
        return <span className="loading loading-dots loading-lg"></span>;
    }
    console.log(guide);

    return (
        <div className='w-11/12 mx-auto my-20 space-y-10'>
            <h1 className='text-4xl font-semibold'>Our Guides</h1>
            <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
                {
                    guide.map(gui => <div key={gui._id} className='flex items-center gap-5 p-5 border-2 rounded-lg'>
                        <div>
                            <img src={gui.image} alt={gui.name} className='w-32 h-32' />
                        </div>
                        <div className='space-y-5'>
                            <h1 className='text-2xl font-medium'>Guide Name: {gui.name}</h1>
                            <h1>Division: {gui.division}</h1>
                            <p>Description: {gui.details}</p>
                            <h1>Price: {gui.price}</h1>
                            <div className='flex justify-around'>
                                <Link>
                                   <button className='bg-[#47FC22] hover:bg-[#47FC22] rounded-md text-white font-semibold px-5 py-2'>Book</button>
                                </Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ManageGuide;