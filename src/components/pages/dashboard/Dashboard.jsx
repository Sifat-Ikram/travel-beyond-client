import { Outlet } from 'react-router-dom';
import NavbarSecond from "../../shared/NavbarSecond.jsx"
import AdminHome from '../adminRouter/home/AdminHome.jsx';

const Dashboard = () => {
    return (
        <div>
            <div>
                <NavbarSecond></NavbarSecond>
            </div>
            <div>
                <Outlet></Outlet>
                <AdminHome></AdminHome>
            </div>
        </div>
    );
};

export default Dashboard;