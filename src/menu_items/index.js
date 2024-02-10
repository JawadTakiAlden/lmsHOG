import { BookOutlined, CategoryOutlined, CodeOutlined, Dashboard, NewspaperOutlined, PeopleOutlined, PersonOutlined, ShowChartOutlined } from "@mui/icons-material";

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
      {
        id: "create-course",
        title: "Create Course",
        path: "/dashboard/courses/create",
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
  {
    id: "categories",
    title: "Categories",
    type: "group",
    icon: <CategoryOutlined />,
    children: [
      {
        id: "all-categories",
        title: "All Categories",
        path: "/dashboard/categories/all",
        type: "item",
      },
      {
        id: "create-category",
        title: "Create Category",
        path: "/dashboard/categories/create",
        type: "item",
      },
    ],
  },
  {
    id: "news",
    title: "News",
    type: "group",
    icon: <NewspaperOutlined />,
    children: [
      {
        id: "all-news",
        title: "All News",
        path: "/dashboard/news/all",
        type: "item",
      },
      {
        id: "create-news",
        title: "Create News",
        path: "/dashboard/news/create",
        type: "item",
      },
    ],
  },
  {
    id: "statistics",
    title: "Statistics",
    type: "group",
    icon: <ShowChartOutlined />,
    children: [
      {
        id : 'statistics',
        title : 'Reset',
        path : '/statistics/reset',
        type : 'item'
      },
    ],
  },
  {
    id: "activationCode",
    title: "Activation Code",
    type: "group",
    icon: <CodeOutlined />,
    children: [
      {
        id : 'all-activation-code',
        title : 'All Activation Code',
        path : '/dashboard/activationCode',
        type : 'item'
      },
    ],
  },
];
