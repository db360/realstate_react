import { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailcontext from "../../context/UserDetailContext";
import { useMutation } from "react-query";
import { createUser } from "../../utils/api";

const Layout = () => {
  // layout es el primero que CanvasGradient, haremos la authentication aqui
  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails } = useContext(UserDetailcontext);

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  useEffect(() => {
    const getTokenAndRegister = async () => {

      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "http://localhost:8000",
          scope: "openid profile email",
        },
      });

      localStorage.setItem("access_token", res);
      setUserDetails((prev) => ({ ...prev, token: res }));
      // console.log(res)
      mutate(res);
    };

    isAuthenticated && getTokenAndRegister();

  }, [isAuthenticated]);

  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
