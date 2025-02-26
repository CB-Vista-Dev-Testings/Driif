import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "../components/Layouts/Layout";

const PrivateRoute = ({ roles }) => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default PrivateRoute;
