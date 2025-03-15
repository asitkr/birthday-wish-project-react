import { Suspense } from "react";
import PropTypes from "prop-types";
import Auth from "./auth/Auth";
import Layout from "./components/Layout";
import Loader from "./components/Loader";

/**
 * Component to wrap pages with Layout, Suspense, and Authentication.
 * @param {React.ComponentType} Component - Page component.
 * @param {boolean} isProtected - If true, restrict access to logged-in users. If false, restrict access to guests.
 */
const WithLayout = ({ Component, isProtected }) => {
  const ProtectedComponent = Auth(Component, isProtected);
  
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <ProtectedComponent />
      </Suspense>
    </Layout>
  );
};

WithLayout.propTypes = {
  Component: PropTypes.node,
  isProtected: PropTypes.bool,
};

export default WithLayout;
