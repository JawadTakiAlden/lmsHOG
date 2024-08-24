import "./App.css";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import NavigationOnScroll from "./layouts/NavigationOnScroll/NavigationOnScroll";
import { Routes, Route } from "react-router";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Loadable from "./components/Loadable";
import { lazy } from "react";
import MinimalLayout from "./layouts/MinimalLayout";
import { useSelector } from "react-redux";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RTL from "./components/RTL/RTL";
import { arSA } from '@mui/material/locale';
import { enUS } from '@mui/material/locale';
const Login = Loadable(lazy(() => import("./views/auth/Login/Login")));
const StudentList = Loadable(
  lazy(() => import("./views/pages/student/studentList"))
);
const CourseList = Loadable(
  lazy(() => import("./views/pages/courses/courseList"))
);
const Categories = Loadable(lazy(() => import("./views/pages/categories")));
const CourseDetails = Loadable(
  lazy(() => import("./views/pages/courses/courseDetails"))
);
const NewEnroll = Loadable(
  lazy(() => import("./views/pages/student/newEnroll"))
);
const CreateAccount = Loadable(
  lazy(() => import("./views/pages/Accounts/CreateAccount"))
);
const AllAccounts = Loadable(
  lazy(() => import("./views/pages/Accounts/allAccounts"))
);
const EnrolledStudents = Loadable(
  lazy(() => import("./views/pages/student/enrolledStudents"))
);
const QuizDetials = Loadable(
  lazy(() => import("./views/pages/Quizzes/QuizDetails"))
);
const AllQuiz = Loadable(lazy(() => import("./views/pages/Quizzes/AllQuiz")));
const QuestionDetails = Loadable(
  lazy(() => import("./views/pages/Question/QuestionDetails"))
);
const QuestionsList = Loadable(
  lazy(() => import("./views/pages/Question/QuestionsList"))
);
const CreateQuestion = Loadable(
  lazy(() => import("./views/pages/Question/CreateQuestion"))
);
const ActivationCode = Loadable(
  lazy(() => import("./views/pages/ActivationCode"))
);
const CheckCode = Loadable(
  lazy(() => import("./views/pages/ActivationCode/CheckCode"))
);
const ResetPage = Loadable(lazy(() => import("./views/pages/Statistics")));
const CreateCourse = Loadable(
  lazy(() => import("./views/pages/courses/CreateCourse"))
);
const CreateNews = Loadable(
  lazy(() => import("./views/pages/News/CreateNews"))
);
const NewsDetails = Loadable(
  lazy(() => import("./views/pages/News/NewsDetails"))
);
const News = Loadable(lazy(() => import("./views/pages/News")));
const CategoryDetails = Loadable(
  lazy(() => import("./views/pages/categories/CategoryDetails"))
);
const CreateCategroy = Loadable(
  lazy(() => import("./views/pages/categories/CreateCategory"))
);

function App() {
  const { direction } = useSelector((state) => state.customization);
  const theme = createTheme({
    direction,
    palette: {
      background: {
        default: "#FCFCFC",
      },
      primary: {
        main: "#0794EB",
      },
    },
    typography: {
      fontFamily:
        direction === "ltr" ? `"Nunito", sans-serif` : `Hacen Tunisia`,
      mainContent: {
        width: "100%",
        minHeight: "calc(100vh - 88px)",
        flexGrow: 1,
      },
    },
  } , direction === 'rtl'? arSA : enUS );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavigationOnScroll>
          {/* <RTL> */}
          {direction === "rtl" ? (
            <RTL>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="dashboard" element={<MainLayout />}>
                    <Route path="quizzes">
                      <Route path="all" element={<AllQuiz />} />
                    </Route>
                    <Route path="questions">
                      <Route path="create" element={<CreateQuestion />} />
                      <Route path="all" element={<QuestionsList />} />
                    </Route>
                    <Route path="default" element={<Dashboard />} />
                    <Route path="students">
                      <Route path="all" element={<StudentList />} />
                      <Route path="new-enroll" element={<NewEnroll />} />
                      <Route
                        path="all-enrolled"
                        element={<EnrolledStudents />}
                      />
                    </Route>
                    <Route path="courses">
                      <Route path="all" element={<CourseList />} />
                      <Route path="create" element={<CreateCourse />} />
                    </Route>
                    <Route path="accounts">
                      <Route path="create" element={<CreateAccount />} />
                      <Route path="all" element={<AllAccounts />} />
                    </Route>
                    <Route path="categories">
                      <Route path="all" element={<Categories />} />
                      <Route path="create" element={<CreateCategroy />} />
                    </Route>
                    <Route path="news">
                      <Route path="all" element={<News />} />
                      <Route path="create" element={<CreateNews />} />
                    </Route>
                    <Route path="activationCode">
                      <Route path="all" element={<ActivationCode />} />
                      <Route path="check" element={<CheckCode />} />
                    </Route>
                  </Route>
                  <Route path="statistics">
                    <Route path="reset" element={<ResetPage />} />
                  </Route>
                  <Route path="details" element={<MinimalLayout />}>
                    <Route
                      path="course/:course_id"
                      element={<CourseDetails />}
                    />
                    <Route
                      path="category/:category_id"
                      element={<CategoryDetails />}
                    />
                    <Route path="news/:news_id" element={<NewsDetails />} />
                    <Route
                      path="question/:question_id"
                      element={<QuestionDetails />}
                    />
                    <Route path="quiz/:quiz_id" element={<QuizDetials />} />
                  </Route>
                </Route>
              </Routes>
            </RTL>
          ) : (
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<MainLayout />}>
                  <Route path="quizzes">
                    <Route path="all" element={<AllQuiz />} />
                  </Route>
                  <Route path="questions">
                    <Route path="create" element={<CreateQuestion />} />
                    <Route path="all" element={<QuestionsList />} />
                  </Route>
                  <Route path="default" element={<Dashboard />} />
                  <Route path="students">
                    <Route path="all" element={<StudentList />} />
                    <Route path="new-enroll" element={<NewEnroll />} />
                    <Route path="all-enrolled" element={<EnrolledStudents />} />
                  </Route>
                  <Route path="courses">
                    <Route path="all" element={<CourseList />} />
                    <Route path="create" element={<CreateCourse />} />
                  </Route>
                  <Route path="accounts">
                    <Route path="create" element={<CreateAccount />} />
                    <Route path="all" element={<AllAccounts />} />
                  </Route>
                  <Route path="categories">
                    <Route path="all" element={<Categories />} />
                    <Route path="create" element={<CreateCategroy />} />
                  </Route>
                  <Route path="news">
                    <Route path="all" element={<News />} />
                    <Route path="create" element={<CreateNews />} />
                  </Route>
                  <Route path="activationCode">
                    <Route path="all" element={<ActivationCode />} />
                    <Route path="check" element={<CheckCode />} />
                  </Route>
                </Route>
                <Route path="statistics">
                  <Route path="reset" element={<ResetPage />} />
                </Route>
                <Route path="details" element={<MinimalLayout />}>
                  <Route path="course/:course_id" element={<CourseDetails />} />
                  <Route
                    path="category/:category_id"
                    element={<CategoryDetails />}
                  />
                  <Route path="news/:news_id" element={<NewsDetails />} />
                  <Route
                    path="question/:question_id"
                    element={<QuestionDetails />}
                  />
                  <Route path="quiz/:quiz_id" element={<QuizDetials />} />
                </Route>
              </Route>
            </Routes>
          )}

          {/* </RTL> */}
        </NavigationOnScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
