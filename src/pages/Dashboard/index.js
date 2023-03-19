import "antd/dist/antd.css";
import { Link } from "react-router-dom";
// import { useAuthenticated } from "../../hooks/useAuthenticated";
import {
  UserOutlined,
  SettingOutlined,
  PlusCircleOutlined,
  AppstoreOutlined,
  BarsOutlined,
  ReadOutlined
} from "@ant-design/icons";
import "./dashboard.css";
// import DashboardLayout from "./DashboardLayout";
import NavDashboard from "./nav";
import SidebarDashBoard from "./sideBarDashBoard";
import ContentDashboard from "./content";
import DashboardLayout from "./DashboardLayout";
import Profile from "./content/Profile";
import AddPost from "./content/addPost";
import ListingPost from "./content/listingPost";
import University from "./content/university";
import { NotificationContainer } from 'react-notifications';
import { useIsLogin } from "../../hooks/useIsLogin";
import ListPost from "./content/listPost";
import Review from "./content/review";
import AuthorListingPost from "./content/listingPost/authorListingPost";
import AuthorListPost from "./content/listPost/authorListPost";

export default function Dashboard() {
  // useAuthenticated();
  const { admin } = useIsLogin();
  const ROUTE = [
    {
      title: "bảng điều khiển",
      icon: <SettingOutlined />,
      href: "/dashboard",
      exact: true,
      role: ["ADMIN"],
      Component: ContentDashboard,
    },
    {
      title: "Chỉnh sửa hồ sơ",
      icon: <UserOutlined />,
      href: "/dashboard/profile",
      exact: true,
      role: [
        "ADMIN",
        "EDITOR_IN_CHIEF",
        "EDITOR",
        "REVIEWER",
        "AUTHOR",
        "MEMBER",
      ],
      Component: Profile,
    },
    {
      title: "Thêm bài đăng",
      icon: <PlusCircleOutlined />,
      href: "/dashboard/addPost",
      exact: false,
      role: ["AUTHOR", "MEMBER"],
      Component: AddPost,
    },
    {
      title: "Danh sách bản thảo",
      icon: <AppstoreOutlined />,
      href: "/dashboard/postListing",
      exact: false,
      role: ["EDITOR"],
      Component: ListingPost,
    },
    {
      title: "Danh sách bài báo",
      icon: <BarsOutlined />,
      href: "/dashboard/postList",
      exact: false,
      role: ["EDITOR_IN_CHIEF", "EDITOR", "REVIEWER", "MEMBER"],
      Component: ListPost,
    },
    {
      title: "Danh sách bản thảo",
      icon: <AppstoreOutlined />,
      href: "/dashboard/postAuthorListing",
      exact: false,
      role: ["AUTHOR"],
      Component: AuthorListingPost,
    },
    {
      title: "Danh sách bài báo",
      icon: <BarsOutlined />,
      href: "/dashboard/postAuthorList",
      exact: false,
      role: ["AUTHOR"],
      Component: AuthorListPost,
    },
    {
      title: "Phân công người đánh",
      icon: <BarsOutlined />,
      href: "/dashboard/review",
      exact: false,
      role: ["REVIEWER"],
      Component: Review,
    },
    {
      title: "Trường Học",
      icon: <ReadOutlined />,
      href: "/dashboard/university",
      exact: false,
      role: ["ADMIN"],
      Component: University,
    },
  ];
  const ROUTES = ROUTE.filter((item) => item.role.includes(admin));
  return (
    <div className="dashboard">
      <Link to="#" className="dashboard-responsive-nav-trigger">
        <i className="fa fa-reorder" /> Điều hướng bảng điều khiển
      </Link>
      <NavDashboard />
      <SidebarDashBoard ROUTES={ROUTES} />
      <DashboardLayout ROUTES={ROUTES} />
      <NotificationContainer />
    </div>
  );
}
