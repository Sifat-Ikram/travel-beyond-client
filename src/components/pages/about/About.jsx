import Navbar from '../../shared/Navbar.jsx'
import Footer from '../../shared/Footer.jsx'

const About = () => {
    return (
            <div>
                <Navbar></Navbar>
                <div>
                    <img src="https://i.ibb.co/HnrNRRk/file-20210115-21-90wsyw.jpg" className='w-full h-[500px]' alt="" />
                </div>
                <div className='space-y-10 w-4/5 mx-auto mt-10'>
                    <div className='text-center'>
                        <h1 className='text-5xl font-bold'>About</h1>
                    </div>
                    <div>
                        We are Travel Beyond group, a NASDAQ listed company since 2003 (NASDAQ: TCOM) with over 45,100 employees and over 400 million members, making it one of the leading online travel agencies in the world.
                        <br></br>
                        With more than 1.4 million hotels in 200 countries and regions, we have built an extensive hotel network to give our customers a fantastic choice of accommodation. Our far-reaching flight network has over 2 million individual flight routes connecting more than 5,000 cities around the globe. When you combine this with our 24/7 English customer support and various other travel products, you can trust us to take care of your next trip.
                        <br></br>
                        This website is operated by Trip.com Travel Singapore Pte. Ltd., a Singapore entity (registration number 201613701E). Trip.com Singapore is part of the Trip.com Group of companies.
                        <br></br>
                        Trip.com Singapore is licensed under the Travel Agents Act of Singapore (Cap. 334) under license number 02943.
                    </div>
                </div>
                <Footer></Footer>
            </div>

    );
};

export default About;