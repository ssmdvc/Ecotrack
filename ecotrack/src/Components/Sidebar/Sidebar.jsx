import "./Sidebar.scss"
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import RecyclingIcon from '@mui/icons-material/Recycling';
import FeedbackIcon from '@mui/icons-material/Feedback';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {Link} from "react-router-dom"




const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/dashboard" className="custom-link" style={{textDecoration:"none", color:"black"}}>
                <span className="logo">EcoTrack</span>
                </Link>
            </div>
            <div className="center">
                <ul>
                    <p className="title-1"></p>
                    <Link to="/dashboard" className="custom-link" style={{textDecoration:"none"}}>
                    <li>
                        <SpaceDashboardIcon className="icon" />
                        <span>Dashboard</span>
                    </li>
                    </Link>
                    <p className="title"></p>
                    <Link to="/user" className="custom-link" style={{textDecoration:"none"}}>
                    <li>
                        <PeopleOutlineIcon className="icon" />
                        <span>User</span>
                    </li>
                    </Link>
                    <p className="title"></p>
                    <Link to="/trackingpage" className="custom-link">
                    <li>
                        <LocationOnIcon className="icon" />
                        <span>Truck Tracking</span>
                    </li>
                    </Link>
                    <p className="title"></p>
                    <Link to="/request" className="custom-link">
                    <li>
                        <RecyclingIcon className="icon" />
                        <span>Disposal Request</span>
                    </li>
                    </Link>
                    <p className="title"></p>
                    <Link to="/schedule" className="custom-link">
                    <li>
                        <DateRangeIcon className="icon" />
                        <span>Schedule</span>
                    </li>
                    </Link>
                    <p className="title"></p>
                    <Link to="/report" className="custom-link">
                    <li>
                        <AnalyticsIcon className="icon" />
                        <span>Report</span>
                    </li>
                    </Link>
                    <p className="title"></p>
                    <Link to= '/feedback' className="custom-link">
                    <li>
                        <FeedbackIcon className="icon" />
                        <span>User Feedback</span>
                    </li>
                    </Link>

                    <p className="title"></p>
                    <Link to= '/notification' className="custom-link">
                    <li>
                        <NotificationsIcon className="icon" />
                        <span>Notification</span>
                    </li>
                    </Link>

                    

                </ul>
            </div> 
        </div>
    )
}

export default Sidebar