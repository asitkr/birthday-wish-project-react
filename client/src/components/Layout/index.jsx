import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const Layout = ({ children }) => {
  const { theme } = useContext(GlobalContext);

  return (
    <div
      className={`flex flex-col min-h-screen bg-fixed transition-all font-display duration-300
        ${theme === "light" ? "bg-gradient-to-b from-white to-pink-100" : "bg-gradient-to-b from-black to-[#7b5d46]"}
      `}
    >
      <Header />
      <main className="flex-grow w-full px-6 md:px-12">
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;