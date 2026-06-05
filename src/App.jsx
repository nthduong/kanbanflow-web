import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "~/redux/user/userSlice";

import Board from "~/pages/Boards/_id";
import NotFound from "~/pages/404/NotFound";
import Auth from "~/pages/Auth/Auth";
import AccountVerification from "~/pages/Auth/AccountVerification";
import Settings from "~/pages/Settings/Settings";

const ProtectedRoutes = ({ user }) => {
  if (!user) return <Navigate to="/login" replace={true} />;
  return <Outlet />;
};

const UnauthorizedRoutes = ({ user }) => {
  if (user) return <Navigate to="/" replace={true} />;
  return <Outlet />;
};

function App() {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/boards/69f6ca9d05498f694d2515d6" replace={true} />}></Route>
      <Route element={<ProtectedRoutes user={currentUser} />}>
        <Route path="/boards/:boardId" element={<Board />} />
        <Route path="/settings/account" element={<Settings />} />
        <Route path="/settings/security" element={<Settings />} />
      </Route>
      <Route element={<UnauthorizedRoutes user={currentUser} />}>
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
      </Route>
      <Route path="/account/verification" element={<AccountVerification />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
