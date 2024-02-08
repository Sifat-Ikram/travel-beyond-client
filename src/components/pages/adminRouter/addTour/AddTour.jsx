import React from 'react';
import { useForm } from "react-hook-form";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import axios from 'axios';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddTour = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] }
        const res = await axios.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        
        if (res.data.data.display_url) {
            const testInfo = {
                title: data.title,
                division: data.division,
                price: parseFloat(data.price),
                deadline: data.deadline,
                places: data.places,
                date: data.date,
                transportation: data.transportation,
                included_item: data.included_item,
                description: data.description,
                image: res.data.data.display_url
            }

            const testRes = await axiosSecure.post("/tour", testInfo);

            if (testRes.data.insertedId) {
                Swal.fire("Tour added successfully");
                reset();
            }
        }

    }
    return (
        <div>
            <div className='w-5/6 mx-auto'>
                <div className="w-4/5 min-h-screen mx-auto mt-14">
                    <div className="flex-col space-y-12 hero-content">
                        <div className="text-center bg-[#47FC22] w-full py-10">
                            <h1 className="text-5xl font-bold text-white">Add A Tour</h1>
                        </div>
                        <div className="w-full shadow-2xl card shrink-0">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <div className='lg:flex lg:justify-between w-4/5 mx-auto lg:items-center'>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Full Name</span>
                                        </label>
                                        <input type="text" {...register("title")} placeholder="Full Name" className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Division</span>
                                        </label>
                                        <input type="text" {...register("division")} placeholder="Enter Division" className="input input-bordered" />
                                    </div>
                                </div>
                                <div className='lg:flex lg:justify-between w-4/5 mx-auto lg:items-center'>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Price</span>
                                        </label>
                                        <input type="text" {...register("price")} placeholder="Tour price" className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Covered Places</span>
                                        </label>
                                        <input type="text" {...register("places")} placeholder="Type the names of places" className="input input-bordered" />
                                    </div>
                                </div>
                                <div className='lg:flex lg:justify-between w-4/5 mx-auto lg:items-center'>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Transportation</span>
                                        </label>
                                        <input type="text" {...register("transportation")} placeholder="transportation" className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Included item</span>
                                        </label>
                                        <input type="text"{...register("included_item")} placeholder="Included item" className="input input-bordered" />
                                    </div>
                                </div>
                                <div className='lg:flex lg:justify-between w-4/5 mx-auto lg:items-center'>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Deadline</span>
                                        </label>
                                        <input type="date" {...register("deadline")} placeholder="Deadline" className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Tour Date</span>
                                        </label>
                                        <input type="date" {...register("date")} placeholder="Tour date" className="input input-bordered" />
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Tour Description</span>
                                    </label>
                                    <textarea {...register("description")} className="textarea textarea-bordered" placeholder="Tour Description"></textarea>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input {...register("image")} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                                </div>
                                <div className="mt-6 form-control">
                                    <button className="btn font-btn hover:bg-[#47FC22] border-white">Add Tour</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTour;