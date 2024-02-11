import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';

const ManageBooking = () => {
    const axiosSecure = useAxiosSecure();

    const { data: booking = [], refetch } = useQuery({
        queryKey: ['booking._id'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings');
            return res.data;
        }
    })

    const handleDelete = booking => {
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
                axiosSecure.delete(`/bookings/admin/${booking.eventId}`)
                    .then(res => {
                        console.log(res.data);
                        refetch();
                        if (res.data.result.deletedCount > 0) {
                            console.log("admin delete", res.data.result.deletedCount);
                            
                            Swal.fire({
                                title: "Deleted!",
                                text: "This package is removed from any booking",
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
                <h1 className='text-2xl uppercase'>all bookings</h1>
            </div>
            <div className='p-2 mt-10'>
                <div className='flex justify-between'>
                    <h1 className='text-xl font-semibold uppercase'>total users: {booking.length}</h1>
                </div>
                <div className="mt-3 overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-[#47FC22] rounded-lg'>
                            <tr>
                                <th className='text-base font-semibold text-white'></th>
                                <th className='text-base font-semibold text-white'>Name</th>
                                <th className='text-base font-semibold text-white'>Email</th>
                                <th className='text-base font-semibold text-white'>Division</th>
                                <th className='text-base font-semibold text-white'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                booking.map((booking, index) => <tr key={booking._id}>
                                    <th>
                                        <label>{index + 1}</label>
                                    </th>
                                    <td>
                                        <div>
                                            <div className="font-bold">{booking.destination}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div>{booking.email}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div>{booking.division}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <MdDelete onClick={() => handleDelete(booking)} className='p-2 text-4xl text-white bg-red-700 rounded-md cursor-pointer'></MdDelete>
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

export default ManageBooking;