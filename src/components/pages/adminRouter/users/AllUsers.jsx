import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { FaUserGraduate } from 'react-icons/fa';
import { MdDelete, MdEditNote } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: user = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get('/user');
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/user/admin/${user._id}`)
                    .then(res => {
                        refetch();
                        if (res.data.modifiedCount > 0) {
                            console.log("admin made", res.data.modifiedCount);
                            
                            Swal.fire({
                                title: `${user.name} is admin now!`,
                                text: "",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleDelete = user => {

        Swal.fire({
            title: "Are you sure, you want to delete?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/user/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Successful!",
                                text: "User has been deleted successfully.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }

    return (
        <div className='w-5/6 py-10 mx-auto'>
            <div className='py-3 mx-auto text-center border-t-2 border-b-2 border-sky-700 w-60'>
                <h1 className='text-2xl uppercase'>all users</h1>
            </div>
            <div className='p-2 mt-10'>
                <div className='flex justify-between'>
                    <h1 className='text-xl font-semibold uppercase'>total users: {user.length}</h1>
                </div>
                <div className="mt-3 overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-[#47FC22] rounded-lg'>
                            <tr>
                                <th className='text-base font-semibold text-white'></th>
                                <th className='text-base font-semibold text-white'>Name</th>
                                <th className='text-base font-semibold text-white'>Email</th>
                                <th className='text-base font-semibold text-white'>Role</th>
                                <th className='text-base font-semibold text-white'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.map((user, index) => <tr key={user._id}>
                                    <th>
                                        <label>{index + 1}</label>
                                    </th>
                                    <td>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div>{user.email}</div>
                                        </div>
                                    </td>
                                    <td>
                                        {
                                            user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)}>
                                                <FaUserGraduate className='text-4xl bg-[#ac7e13af] text-white p-2 cursor-pointer rounded-md'></FaUserGraduate>
                                            </button>
                                        }
                                    </td>
                                    <td>
                                        <MdDelete onClick={() => handleDelete(user)} className='p-2 text-4xl text-white bg-red-700 rounded-md cursor-pointer'></MdDelete>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;