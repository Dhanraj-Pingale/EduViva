import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpage from "./components/authentication/Landingpage.jsx";
import CompanyDashboard from "./components/company_homepage/Homepage_company.jsx";
import UserDashboard from "./components/user_homepage/User_homepage.jsx";
import Company_Login from "./components/authentication/Company_Login.jsx";
import StudentRegister from "./components/authentication/User_Register.jsx";
import StudentLogin from "./components/authentication/User_Login.jsx";

import Company_home from "./components/company_homepage/pages/Company_home.jsx";
import Interview from "./components/user_homepage/Interview/Interview.jsx";
import CreateInterview from "./components/company_homepage/pages/CreateInterview.jsx";
import Result from "./components/company_homepage/result/Result.jsx";
import QuestionsPage from "./components/company_homepage/result/QuestionsPage.jsx";
import FeedbackPage from "./components/company_homepage/result/FeedbackPage.jsx";
import FeedbackDetailPage from "./components/company_homepage/result/FeedbackDetailPage.jsx";

import Home from "./components/user_homepage/pages/home.jsx";
import Guideline from "./components/user_homepage/pages/Guideline.jsx";
import GiveInterview from "./components/user_homepage/pages/GiveInterview.jsx";
import Demo_viva from "./components/user_homepage/pages/Demo_viva.jsx";
import Settings from "./components/user_homepage/pages/Settings.jsx";
import ReportIssue from "./components/user_homepage/pages/Report_issue.jsx";
import VivaEnd from "./components/user_homepage/pages/Viva_end.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Landingpage />} />
        <Route path="clogin" element={<Company_Login />} />
        <Route path="sregister" element={<StudentRegister />} />
        <Route path="slogin" element={<StudentLogin />} />


        <Route path="my-interview" element={<Interview />} />
        <Route path="viva-end" element={<VivaEnd />} />

        
        {/* Company dashboard routes */}
        <Route path="/company" element={<CompanyLayout />}>
          <Route path="chome" element={<Company_home />} />
          <Route path="create-viva" element={<CreateInterview />} />
          <Route path="result" element={<Result />} />
          <Route path="questions/:vivaID" element={<QuestionsPage />} />
          <Route path="feedback/:vivaID" element={<FeedbackPage />} />
          <Route
          path="feedback/:vivaID/:studentName"
          element={<FeedbackDetailPage />}
        />
        </Route>

        {/* User dashboard routes */}
        <Route path="/user" element={<UserLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="guideline" element={<Guideline />} />
          <Route path="give-viva" element={<GiveInterview />} />
          <Route path="demo-viva" element={<Demo_viva />} />
          <Route path="settings" element={<Settings />} />
          <Route path="report-issue" element={<ReportIssue />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

// Layout components to include `Outlet`
const CompanyLayout = () => (
  <div>
    <CompanyDashboard />
  </div>
);

const UserLayout = () => (
  <div>
    <UserDashboard />
  </div>
);

export default App;
