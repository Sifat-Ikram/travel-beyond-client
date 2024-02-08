import { Link } from "react-router-dom";


const Introduction = () => {
    return (
        <div>
            <div className="flex gap-10 px-10 py-5 flex-col lg:flex-row items-center">
                <figure>
                    <img src="https://i.ibb.co/TMmB3s0/saint-martin-s-island-syed-zakir-hossain-1550144836438-jpeg-watermark-media-2023-05-28-1280px-Dhaka.jpg" className="rounded-lg shadow-2xl" />
                </figure>
                <div className="w-3/5">
                    <h1 className="text-5xl font-bold">Who are we?</h1>
                    <p className="py-6">Travel Beyond is a registered leading tourism developer, tour planner and a Tour Operator in Bangladesh. We are a proud member of the Bangladesh Tourism Foundation (BTF). For the organized support, diverse destinations and flexible pricing have made us a trustworthy place for the passionate traveler.</p>
                    <Link to={"/about"}>
                    <button className='px-3 py-2 bg-[#47FC22] rounded-md text-white font-bold text-lg'>About Us</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Introduction;