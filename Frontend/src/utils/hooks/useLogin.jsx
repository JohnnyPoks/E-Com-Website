// import { useCallback, useEffect, useState } from "react";
// // import { useHistory } from "react-router";
// import { logout } from "../localstorage";
// import Api from "../Api";

// function useLogin() {
//   const [loginInfo, setLoginInfo] = useState({
//     loading: true,
//     isLogin: false,
//   });
//   // const { replace } = useHistory();
//   const checkLogin = useCallback(async () => {
//     try {
//       const { statusCode, data } = await Api.getRequest(`/api/user/me`);
//       console.log({ statusCode, data: JSON.parse(data) });

//       if (statusCode !== 200) {
//         logout();
//         setLoginInfo({ loading: false, isLogin: false });
//       } else {
//         setLoginInfo({ loading: false, isLogin: true });
//       }
//     } catch (error) {
//       console.error("Login check failed:", error);
//       setLoginInfo({ loading: false, isLogin: false });
//     }
//   }, []);

//   useEffect(() => {
//     checkLogin();
//   }, [checkLogin]);

//   return { loginInfo };
// }

// export default useLogin;
