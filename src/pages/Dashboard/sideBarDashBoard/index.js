import { Link } from "react-router-dom";
function SidebarDashBoard({ ROUTES }) {
  const isActive = (path) => {
    if (window.location.pathname === path) return "active";
    else return "false";
  };
  return (
    <div className="dashboard-nav">
      <div className="dashboard-nav-inner">
        <ul>
          {ROUTES.map((r) => {
            return (
              <li key={r.href} className={`${isActive(r.href)}`}>
                <Link to={r.href}>
                  {r.icon} {r.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SidebarDashBoard;
