import { MdPlace } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaPlaceOfWorship } from "react-icons/fa";
import { FaPeopleRoof } from "react-icons/fa6";

const Choosing = () => {
    return (
        <div className="space-y-10">
            <h1 className="text-5xl font-extrabold text-center">Why Choose Travel Beyond</h1>
            <div className="w-4/5 mx-auto flex justify-evenly gap-20">
                <div className="p-10 flex flex-col justify-center bg-base-200 items-center space-y-8 shadow-xl">
                    <MdPlace className="text-8xl text-[#47FC22]"></MdPlace>
                    <h1 className="text-2xl font-bold text-[#47FC22]">Diverse Destinations</h1>
                    <p>Travel Beyond knows the value of your time and the varieties bucket list of you. We have the innovative team to fulfill your taste of diverse destination</p>
                </div>
                <div className="p-10 flex flex-col justify-center items-center bg-base-200 space-y-8 shadow-xl">
                    <IoMdCheckmarkCircle className="text-8xl text-[#47FC22]"></IoMdCheckmarkCircle>
                    <h1 className="text-2xl font-bold text-[#47FC22]">Easy Tour Confirmation</h1>
                    <p>A long Tour Confirmation process can not support you to purchase any tour package. Travel Beyond has tried to complete the whole process into one call</p>
                </div>
            </div>
            <div className="w-4/5 mx-auto flex justify-evenly gap-20">
                <div className="p-10 flex flex-col justify-center bg-base-200 items-center space-y-8 shadow-xl">
                    <FaPlaceOfWorship className="text-8xl text-[#47FC22]"></FaPlaceOfWorship>
                    <h1 className="text-2xl font-bold text-[#47FC22]">Beautiful Places</h1>
                    <p>Travelers want beautiful and unique places every time they want to leave the home. We are ready with years of experience to introduce the best places in the Wolrd</p>
                </div>
                <div className="p-10 flex flex-col justify-center items-center bg-base-200 space-y-8 shadow-xl">
                    <FaPeopleRoof className="text-8xl text-[#47FC22]"></FaPeopleRoof>
                    <h1 className="text-2xl font-bold text-[#47FC22]">Easy Tour Confirmation</h1>
                    <p>A long Tour Confirmation process can not support you to purchase any tour package. Travel Beyond has tried to complete the whole process into one call</p>
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default Choosing;