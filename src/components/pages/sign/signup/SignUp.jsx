import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { AuthContext } from '../../../provider/AuthProvider';
import Swal from 'sweetalert2';
import Navbar from '../../../shared/Navbar';
import Footer from '../../../shared/Footer';
import { FcGoogle } from 'react-icons/fc';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser, googleSignUp } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleGoogle = () => {
        googleSignUp()
            .then(res => {
                console.log(res.user);
                updateProfile(res.user, {
                    displayName: res.user.name,
                    email: res.user.email
                })

                const userInfo = {
                    name: res.user.name,
                    email: res.user.email
                }

                axiosPublic.post("/user", userInfo)
                    .then(res => {

                        if (res.data.insertedId) {
                            navigate(location?.state ? location.state : '/');
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "You signed up successfully!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            })
            .catch(err => {
                console.error(err.message);
            })
    }

    const handleSignUp = e => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        console.log(name, email, password);

        const regex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (password.length < 6) {
            setError("Password should be at least 6 characters");
            return;
        }
        else if (regex.test(password)) {
            setError("You can not use any capital letter or any special character");
            return;
        }

        setError('');
        setSuccess('');

        createUser(email, password)
            .then(res => {

                updateProfile(res.user, {
                    displayName: name,
                    email: email
                })

                const userInfo = {
                    name: name,
                    email: email
                }

                axiosPublic.post("/user", userInfo)
                    .then(res => {

                        if (res.data.insertedId) {
                            navigate(location?.state ? location.state : '/');
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "You signed up successfully!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })


            })
            .catch(err => {
                console.error(err);
                setError(err.message);
            })
    }


    return (
        <div>
            <Navbar></Navbar>
            <div className='w-5/6 mx-auto'>
                <div className="w-3/5 min-h-screen mx-auto mt-14">
                    <div className="flex-col space-y-12 hero-content">
                        <div className="text-center bg-[#47FC22] w-full py-10">
                            <h1 className="text-5xl font-bold text-white">Sign up now!</h1>
                        </div>
                        <div className="w-full shadow-2xl card shrink-0">
                            <form onSubmit={handleSignUp} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input type="text" name='name' placeholder="Full Name" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                </div>
                                <div className="mt-6 form-control">
                                    <button className="btn font-btn hover:bg-[#47FC22] border-white">Sign up</button>
                                </div>
                                {
                                    error && <p className="text-base text-red-800">{error}</p>
                                }
                                <div className='flex justify-center'>
                                    <Link to={'/signIn'}><p>Already have account? <span className='text-[#47FC22]'>Sign in</span></p></Link>
                                </div>
                            </form>

                            <div className='flex items-center justify-center mb-10 bg-white'>
                                <button onClick={handleGoogle} className='btn btn-outline border-[#47FC22] hover:bg-[#47FC22] w-1/2 flex justify-center gap-5 text-black text-2xl font-bold'><FcGoogle></FcGoogle> Google</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default SignUp;