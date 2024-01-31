import { BookOutlined, Dashboard, PeopleOutlined, PersonOutlined } from "@mui/icons-material";

export const menuitems = [
  {
    id: "default",
    title: "dashboard",
    path: "/dashboard/default",
    icon: <Dashboard />,
    type: "item",
  },
  {
    id: "student",
    title: "Student",
    type: "group",
    icon: <PeopleOutlined />,
    children: [
      {
        id: "all-student",
        title: "all",
        path: "/dashboard/students/all",
        type: "item",
      },
      {
        id: "new-enroll",
        title: "new enroll",
        path: "/dashboard/students/new-enroll",
        type: "item",
      },
      {
        id: "all-enrolled",
        title: "Enrolled Students",
        path: "/dashboard/students/all-enrolled",
        type: "item",
      },
    ],
  },
  {
    id: "courses",
    title: "Courses",
    type: "group",
    icon: <BookOutlined />,
    children: [
      {
        id: "all-courses",
        title: "All Courses",
        path: "/dashboard/courses/all",
        type: "item",
      },
    ],
  },
  {
    id: "accounts",
    title: "Accounts",
    type: "group",
    icon: <PersonOutlined />,
    children: [
      {
        id: "all-accounts",
        title: "All Account",
        path: "/dashboard/accounts/all",
        type: "item",
      },
      {
        id: "create-account",
        title: "Create Account",
        path: "/dashboard/accounts/create",
        type: "item",
      },
    ],
  },
];
