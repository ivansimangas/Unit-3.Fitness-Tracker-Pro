import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import ActivitiesPage from "./activities/ActivitiesPage";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Error404 from "./Error404";
import ActivityDetails from "./activities/ActivityDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ActivitiesPage />} />
        <Route path="activities" element={<ActivitiesPage />} />
        <Route path="activities/:activityId" element={<ActivityDetails />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
