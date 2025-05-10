"use client";
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

const Footer = () => {
  const links = ["Link1", "Link2", "Link3", "Link4", "Link5", "Link6"];
  const icons = [
    { icon: <FaTiktok size={20} />, url: "#" },
    { icon: <FaFacebook size={20} />, url: "#" },
    { icon: <FaInstagram size={20} />, url: "#" },
    { icon: <FaTwitter size={20} />, url: "#" },
  ];

  return (
    <footer className="bg-gray-100 py-6 mt-8">
      {/* Links Section */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center md:text-left">
          {links.map((link, index) => (
            <a
              key={index}
              href="#"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* Icons Section */}
      <div className="container mx-auto px-4 mt-6 flex justify-center gap-8">
        {icons.map((icon, index) => (
          <a
            key={index}
            href={icon.url}
            className="text-gray-600 hover:text-gray-900"
          >
            {icon.icon}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
