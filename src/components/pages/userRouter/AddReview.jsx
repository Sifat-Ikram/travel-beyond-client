import React, { useContext } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';

const AddReview = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    console.log(user.email);

    const handleAddReview = async(e) => {
        e.preventDefault();
        const review = e.target.review.value;
        
        const reviewItem = {
            email : user.email,
            review: review
        }
    
        const reviewRes = await axiosPublic.post("/review", reviewItem);
        if (reviewRes.data.insertedId) {
            console.log(reviewRes.data);
            Swal.fire("Review added successfully");
            reset();
        }

    }


    return (
        <div className='w-3/4 mx-auto space-y-10'>
            <h1 className='mt-10 text-5xl font-semibold'>Add A Review</h1>
            <form onSubmit={handleAddReview} className='flex flex-col space-y-5'>
                <textarea name='review' className="w-3/4 textarea textarea-bordered h-72" placeholder="Add a review"></textarea>
                <button type='submit' className='bg-[#47FC22] hover:bg-[#47FC22] w-40 rounded-md p-3 text-xl font-semibold text-white'>Add Review</button>
            </form>
        </div>
    );
};

export default AddReview;