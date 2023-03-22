import React from "react";
import { Link } from "react-router-dom";
import ProfileNav from "./profileNav";
import Notify from "./notify";
import Bell from "./bell";
function NavDashboard() {
  return (
    <div className="dashboard-sticky-nav">
      <div className="content-left pull-left">
        <Link to="/">eJounal</Link>
      </div>
      <div className="content-right pull-right">
        <ProfileNav />
      </div>
    </div>
  );
}

export default NavDashboard;
