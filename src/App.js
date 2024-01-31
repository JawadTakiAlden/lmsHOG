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
const Login = Loadable(lazy(() => import("./views/auth/Login/Login")));
const Dashboard = Loadable(lazy(() => import("./views/Dashboard")));
const StudentList = Loadable(lazy(() => import("./views/pages/student/studentList")));
const CourseList =  Loadable(lazy(() => import("./views/pages/courses/courseList")));
const CourseDetails = Loadable(lazy(() => import("./views/pages/courses/courseDetails")));
const NewEnroll = Loadable(lazy(() => import("./views/pages/student/newEnroll")));
const CreateAccount = Loadable(lazy(() => import("./views/pages/Accounts/CreateAccount")));
const AllAccounts = Loadable(lazy(() => import("./views/pages/Accounts/allAccounts")));
const EnrolledStudents = Loadable(lazy(() => import("./views/pages/student/enrolledStudents")));
const MainLayout = Loadable(lazy(() => import("./layouts/MainLayout")));

const theme = createTheme({
  palette: {
    background: {
      default: "#FCFCFC",
    },
    primary: {
      main: "#0794EB",
    },
  },

  typography : {
    mainContent: {
      width: '100%',
      minHeight: 'calc(100vh - 88px)',
      flexGrow: 1,
    },
  }
});

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavigationOnScroll>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="dashboard" element={<MainLayout />}>
              <Route path="default" element={<Dashboard />} />
              <Route path="students">
                <Route
                  path="all"
                  element={<StudentList />}
                />
                <Route
                  path="new-enroll"
                  element={<NewEnroll />}
                />
                <Route
                  path="all-enrolled"
                  element={<EnrolledStudents />}
                />
              </Route>
              <Route path="courses">
                <Route path="all" element={<CourseList />} />
              </Route>
              <Route path="accounts">
                <Route path="create" element={<CreateAccount />} />
                <Route path="all" element={<AllAccounts />} />
              </Route>
            </Route>
            <Route path="details" element={<MinimalLayout />}>
              <Route path="course/:course_id" element={<CourseDetails />} />
            </Route>
          </Routes>
        </NavigationOnScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
