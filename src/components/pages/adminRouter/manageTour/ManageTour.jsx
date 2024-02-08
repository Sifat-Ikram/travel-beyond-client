import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ManageTour = () => {
    const axiosSecure = useAxiosSecure();
    const { data: tours = [], refetch } = useQuery({
        queryKey: ['tour._id'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tour');
            return res.data;
        }
    })

    const handleDelete = tour => {

        Swal.fire({
            title: "Are you really want to delete this test?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tour/${tour._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Test Deleted!",
                                text: "Tour event has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })

            }
        });
    }

    return (
        <div className='w-5/6 mx-auto space-y-4 mt-10'>
            <h1 className='text-5xl font-bold'>Manage Tours</h1>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-5'>
                {
                    tours.map(tour => <div key={tour._id} className="card lg:card-side items-center bg-base-100 shadow-xl">
                        <figure><img src={tour.image} className='w-60 h-60' alt="Album" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{tour.title}</h2>
                            <h1><span className='text-lg font-semibold'>Division:</span> {tour.division}</h1>
                            <h3><span className='text-lg font-semibold'>Deadline: </span>{tour.deadline}</h3>
                            <h4><span className='text-lg font-semibold'>Price:</span> {tour.price}</h4>
                        </div>
                        <div className='gap-10 flex justify-center lg:flex-col'><Link to={`/dashboard/updateTour/${tour._id}`}>
                            <button className='bg-yellow-600 p-1 rounded-md text-white text-4xl'><CiEdit></CiEdit></button></Link>
                            <button onClick={() => handleDelete(tour)} className='bg-red-700 p-1 rounded-md text-white text-4xl'><MdDelete></MdDelete></button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ManageTour;