import Navbar from "../../shared/Navbar";
import Footer from '../../shared/Footer';
import Banner from './banner/Banner';
import Review from './review/Review';
import DayTour from "./shortTrip/DayTour";
import Introduction from "./introduction/Introduction";
import Choosing from "./choosing/Choosing";

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='w-5/6 mx-auto space-y-16'>
                <Banner></Banner>
                <Introduction></Introduction>
                <DayTour></DayTour>
                <Choosing></Choosing>
                <Review></Review>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;