import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import './index.css'
import Home from './components/pages/home page/Home.jsx'
import ErrorPage from './components/pages/errorpage/ErrorPage.jsx'
import SignUp from './components/pages/sign/signup/SignUp.jsx'
import AuthProvider from './components/provider/AuthProvider.jsx'
import SignIn from './components/pages/sign/signin/SignIn.jsx'
import About from './components/pages/about/About.jsx'
import Places from './components/pages/places/Places.jsx'
import Dashboard from './components/pages/dashboard/Dashboard.jsx'
import AllUsers from './components/pages/adminRouter/users/AllUsers.jsx'
import PrivateRouter from './components/privateRouter/PrivateRouter.jsx';
import AdminRouter from './components/privateRouter/AdminRouter.jsx';
import AllTour from './components/pages/tour/AllTour.jsx';
import AddTour from './components/pages/adminRouter/addTour/AddTour.jsx';
import ManageTour from './components/pages/adminRouter/manageTour/ManageTour.jsx';
import UpdateTour from './components/pages/adminRouter/updateTour/UpdateTour.jsx';
import MyBookings from './components/pages/userRouter/MyBookings.jsx';
import TourDetails from './components/pages/tour_details/TourDetails.jsx';
import DivisionDetails from './components/pages/divisionDetails/DivisionDetails.jsx';
import ManageBooking from './components/pages/adminRouter/manageBooking/ManageBooking.jsx';
import AddReview from './components/pages/userRouter/AddReview.jsx';
import ManageGuide from './components/pages/adminRouter/guides/manageGuide.jsx';
import Payment from './components/pages/userRouter/Payment.jsx';

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>
      },
      {
        path: "/signIn",
        element: <SignIn></SignIn>
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path: "/places/:id",
        element: <Places></Places>
      },
      {
        path: "/divisionDetails/:id",
        element: <DivisionDetails></DivisionDetails>
      },
      {
        path: "/allTour",
        element: <AllTour></AllTour>
      },
      {
        path: "/tourDetails/:id",
        element: <TourDetails></TourDetails>
      },
      {
        path: "/dashboard",
        element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
        children: [
          {
            path: "/dashboard/allUser",
            element: <AdminRouter><AllUsers></AllUsers></AdminRouter>
          },
          {
            path: "/dashboard/addTour",
            element: <AdminRouter><AddTour></AddTour></AdminRouter>
          },
          {
            path: "/dashboard/manageTour",
            element: <ManageTour></ManageTour>
          },
          {
            path:"/dashboard/updateTour/:id",
            element: <UpdateTour></UpdateTour>
          },
          {
            path: "/dashboard/booking",
            element: <MyBookings></MyBookings>
          },
          {
            path: "/dashboard/manageBooking",
            element: <ManageBooking></ManageBooking>
          },
          {
            path: "/dashboard/addReview",
            element: <AddReview></AddReview>
          },
          {
            path: "/dashboard/manageGuide",
            element: <ManageGuide></ManageGuide>
          },
          {
            path: "/dashboard/payment",
            element: <Payment></Payment>
          }
        ]
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
