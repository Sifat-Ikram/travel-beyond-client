import { Outlet } from 'react-router-dom';
import NavbarSecond from "../../shared/NavbarSecond.jsx"

const Dashboard = () => {
    return (
        <div>
            <div>
                <NavbarSecond></NavbarSecond>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;