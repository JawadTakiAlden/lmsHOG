import {
  BookOutlined,
  CategoryOutlined,
  CodeOutlined,
  Dashboard,
  NewspaperOutlined,
  PeopleOutlined,
  PersonOutlined,
  QuestionAnswerOutlined,
  QuizOutlined,
  ShowChartOutlined,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export const useMenuItems = () => {
  const {t} = useTranslation()
  return [
    {
      id: "default",
      title: t('sidebar.items.dashboard'),
      path: "/dashboard/default",
      icon: <Dashboard />,
      type: "item",
    },
    {
      id: "student",
      title: t('sidebar.items.students.group'),
      type: "group",
      icon: <PeopleOutlined />,
      children: [
        {
          id: "all-student",
          title: t('sidebar.items.students.items.1'),
          path: "/dashboard/students/all",
          type: "item",
        },
        {
          id: "new-enroll",
          title: t('sidebar.items.students.items.2'),
          path: "/dashboard/students/new-enroll",
          type: "item",
        },
        {
          id: "all-enrolled",
          title: t('sidebar.items.students.items.3'),
          path: "/dashboard/students/all-enrolled",
          type: "item",
        },
      ],
    },
    {
      id: "courses",
      title: t('sidebar.items.courses.group'),
      type: "group",
      icon: <BookOutlined />,
      children: [
        {
          id: "all-courses",
          title:t('sidebar.items.courses.items.1'),
          path: "/dashboard/courses/all",
          type: "item",
        },
        {
          id: "create-course",
          title: t('sidebar.items.courses.items.2'),
          path: "/dashboard/courses/create",
          type: "item",
        },
      ],
    },
    {
      id: "accounts",
      title:  t('sidebar.items.accounts.group'),
      type: "group",
      icon: <PersonOutlined />,
      children: [
        {
          id: "all-accounts",
          title: t('sidebar.items.accounts.items.1'),
          path: "/dashboard/accounts/all",
          type: "item",
        },
        {
          id: "create-account",
          title: t('sidebar.items.accounts.items.2'),
          path: "/dashboard/accounts/create",
          type: "item",
        },
      ],
    },
    {
      id: "categories",
      title: t('sidebar.items.categories.group'),
      type: "group",
      icon: <CategoryOutlined />,
      children: [
        {
          id: "all-categories",
          title: t('sidebar.items.categories.items.1'),
          path: "/dashboard/categories/all",
          type: "item",
        },
        {
          id: "create-category",
          title: t('sidebar.items.categories.items.2'),
          path: "/dashboard/categories/create",
          type: "item",
        },
      ],
    },
    {
      id: "news",
      title: t('sidebar.items.news.group'),
      type: "group",
      icon: <NewspaperOutlined />,
      children: [
        {
          id: "all-news",
          title: t('sidebar.items.news.items.1'),
          path: "/dashboard/news/all",
          type: "item",
        },
        {
          id: "create-news",
          title: t('sidebar.items.news.items.2'),
          path: "/dashboard/news/create",
          type: "item",
        },
      ],
    },
    {
      id: "statistics",
      title: t('sidebar.items.statistics.group'),
      type: "group",
      icon: <ShowChartOutlined />,
      children: [
        {
          id: "statistics",
          title: t('sidebar.items.statistics.items.1'),
          path: "/statistics/reset",
          type: "item",
        },
      ],
    },
    {
      id: "activationCode",
      title: t('sidebar.items.activation_code.group'),
      type: "group",
      icon: <CodeOutlined />,
      children: [
        {
          id: "all-activation-code",
          title:t('sidebar.items.activation_code.items.1'),
          path: "/dashboard/activationCode/all",
          type: "item",
        },
        {
          id: "check-activation-code",
          title:t('sidebar.items.activation_code.items.2'),
          path: "/dashboard/activationCode/check",
          type: "item",
        },
      ],
    },
    {
      id: "questions",
      title: t('sidebar.items.questions.group'),
      type: "group",
      icon: <QuestionAnswerOutlined />,
      children: [
        {
          id: "all-question",
          title: t('sidebar.items.questions.items.1'),
          path: "/dashboard/questions/all",
          type: "item",
        },
        {
          id: "create-question",
          title: t('sidebar.items.questions.items.2'),
          path: "/dashboard/questions/create",
          type: "item",
        },
      ],
    },
    {
      id: "quizzes",
      title: t('sidebar.items.quizzes.group'),
      type: "group",
      icon: <QuizOutlined />,
      children: [
        {
          id: "all-quizzes",
          title: t('sidebar.items.quizzes.items.1'),
          path: "/dashboard/quizzes/all",
          type: "item",
        },
      ],
    },
  ];
};
