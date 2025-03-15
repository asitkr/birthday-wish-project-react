import { Navigate } from "react-router-dom";

// Function to check if the user is authenticated
const isAuthenticated = () => !!localStorage.getItem("authToken");

/**
 * HOC to protect routes based on authentication.
 * @param {React.ComponentType} WrappedComponent - The component to be wrapped.
 * @param {boolean} isProtected - If true, restrict access to logged-in users. If false, restrict access to guests.
 */
const Auth = (WrappedComponent, isProtected) => {
  return function AuthGuard(props) {
    const loggedIn = isAuthenticated();

    if (isProtected && !loggedIn) {
      return <Navigate to="/login" replace />;
    }

    if (!isProtected && loggedIn) {
      return <Navigate to="/" replace />;
    }

    return <WrappedComponent {...props} />; // ✅ Return JSX
  };
};

export default Auth;
