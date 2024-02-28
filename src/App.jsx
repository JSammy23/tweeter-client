import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import PrivateRoute from "./components/PrivateRoute";
import FeedPage from "./pages/Feed/FeedPage";
import HomeContent from "./components/HomeContent";
import Thread from "./components/Thread";
import ProfileContent from "./components/ProfileContent";
import ExploreContent from "./components/ExploreContent";
import NotificationContent from "./components/NotificationContent";
import SearchContent from "./components/SearchContent";
import MessageContent from "./components/MessageContent";


function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* For Testing */}
        {/* <Route path="/test" element={<TestComp />} /> */}
        <Route path="/*" element={<PrivateRoute>
          <FeedPage>
            <Routes>
              <Route path="/home" element={<HomeContent />} />
              <Route path="/explore" element={<ExploreContent />} />
              <Route path="/thread/:threadId" element={<Thread />} />
              <Route path="/profile/:userId/*" element={<ProfileContent />} />
              <Route path="/notifications" element={<NotificationContent />} />
              <Route path="/search" element={<SearchContent />} />
              <Route exact path="/messages/*" element={<MessageContent />} />
            </Routes>
          </FeedPage>
        </PrivateRoute> } >
        </Route>
      </Routes>
    </>
  )
}

export default App
