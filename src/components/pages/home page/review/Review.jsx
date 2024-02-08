import React, { useContext } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../provider/AuthProvider';

const Review = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const { data: review = [], refetch } = useQuery({
        queryKey: ['review._id'],
        queryFn: async () => {
            const res = await axiosPublic.get('/review');
            return res.data;
        }
    })

    if (!user) {
        return <span className="loading loading-dots loading-lg"></span>;
    }

    return (
        <div>
            {
                review.map(rev => <div key={rev._id}>
                    <h1 className='text-5xl font-semibold text-center'>{ rev.review }</h1>
                </div>)
            }
        </div>
    );
};

export default Review;