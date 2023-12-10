import React from 'react';
import banner from '../../../../assets/banner.webp'

const Banner = () => {
    return (
        <div className="hero h-[450px]" style={{ backgroundImage: `url(${banner})` }}>
            <div className="flex justify-between pr-10 text-center text-white hero-content">
                <div></div>
                <div className="z-10 w-3/5 lg:ml-96">
                    <h1 className="mb-5 text-4xl font-bold text-white uppercase lg:text-4xl">start exploring with <span className='text-6xl font-bold text-red-700 font-fira'>Travel Beyond</span></h1>
                </div>
            </div>
        </div>
    );
};

export default Banner;