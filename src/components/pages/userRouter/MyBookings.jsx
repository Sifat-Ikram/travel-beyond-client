import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import useCart from '../../hooks/useCart';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

const MyBookings = () => {
    const axiosPublic = useAxiosPublic();
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const { user } = useContext(AuthContext);


    if (!cart && !user) {
        return <span className="loading loading-dots loading-lg"></span>
    }

    console.log(cart);
    const handleDelete = id => {
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
                axiosPublic.delete(`bookings/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }

    return (
        <div className='w-11/12 mx-auto mt-10'>
            <div className='w-full bg-[#47FC22] py-5'>
                <h1 className='text-4xl text-center text-white uppercase text-extrabold'>all bookings</h1>
            </div>
            <div className='p-2 mt-10'>
                <div className="mt-3 overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-[#47FC22] rounded-lg'>
                            <tr>
                                <th className='text-base font-semibold text-white'></th>
                                <th className='text-base font-semibold text-white'>Image</th>
                                <th className='text-base font-semibold text-white'>Test Name</th>
                                <th className='text-base font-semibold text-white'>Price</th>
                                <th className='text-base font-semibold text-white'>Appointment date</th>
                                <th className='text-base font-semibold text-white'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((item, index) => <tr key={item._id}>
                                    <th>
                                        <label>{index + 1}</label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="w-12 h-12 mask mask-squircle">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div className="font-bold">{item.title}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div className="font-bold">${item.price}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div className="font-bold">{item.date}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <MdDelete onClick={() => handleDelete(item._id)} className='p-2 text-4xl text-white bg-red-700 rounded-md cursor-pointer'></MdDelete>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
                <div className='flex justify-between mt-5'>
                    <h1 className='text-xl font-semibold uppercase'>total items: {cart.length}</h1>
                    <h1 className='text-xl font-semibold uppercase'>total items: ${totalPrice}</h1>
                    <Link to={"/dashboard/payment"}>
                        <button disabled={!cart.length} className='bg-[#47FC22] py-2 px-4 rounded-sm font-semibold text-white'>Pay</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyBookings;