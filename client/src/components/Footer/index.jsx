import { Link } from "react-router-dom";
import { essentialData } from "../../utils/utils";

const Footer = () => {
  return (
    <footer className="w-full px-12 md:px-12 py-4 flex justify-between items-center shadow-md shadow-gray-700/100 text-primary-text">
      <div className="text-sm">
        © {new Date().getFullYear()} All rights reserved
      </div>

      <div className="text-sm">
        Designed & Developed by <span className="font-semibold">
          <Link to={`${essentialData?.githubURL}`} target="_blank" className="text-button-background">Ashit</Link>
          </span>
      </div>
    </footer>
  )
}

export default Footer;