import "@fortawesome/fontawesome-free/css/all.min.css";

// Social Media Links Component
const SocialMediaLinks = () => {
  const socialLinks = [
    { href: "https://facebook.com", icon: "fab fa-facebook-f", label: "Facebook" },
    { href: "https://twitter.com", icon: "fab fa-twitter", label: "Twitter" },
    { href: "https://instagram.com", icon: "fab fa-instagram", label: "Instagram" },
    { href: "https://linkedin.com", icon: "fab fa-linkedin-in", label: "LinkedIn" },
  ];

  return (
    <div className="flex space-x-4">
      {socialLinks.map(({ href, icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="hover:scale-105 transition-transform text-lg"
        >
          <i className={icon}></i>
        </a>
      ))}
    </div>
  );
};

// Quick Links Component
const QuickLinks = () => {
  const links = [
    { href: "/about", text: "About Us" },
    { href: "/programs", text: "Our Programs" },
    { href: "/contact", text: "Contact Us" },
    { href: "/donate", text: "Donate" },
  ];

  return (
    <div className="flex flex-col space-y-4 w-4/6 lg:w-1/3">
      <h2 className="text-lg font-bold">Quick Links</h2>
      <ul className="space-y-2 text-sm">
        {links.map(({ href, text }) => (
          <li key={text}>
            <a href={href} className="hover:underline">{text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-orange-600 text-white pt-10 pb-8 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between space-y-10 lg:space-y-0 lg:space-x-20">
        
        {/* About Section */}
        <div className="flex flex-col space-y-4 w-full lg:w-1/3">
          <h2 className="text-lg font-bold">About Us</h2>
          <p className="text-sm">
            We are committed to bringing smiles and support to those in need. Through donations and volunteer work, we aim to make a difference in our community.
          </p>
        </div>

        {/* Quick Links Section */}
        <QuickLinks />

        {/* Social Media & Call to Action */}
        <div className="flex flex-col items-center lg:items-start space-y-6 w-full lg:w-1/3">
          <h2 className="text-lg font-bold">Connect with Us</h2>
          <SocialMediaLinks />
          <button className="mt-4 bg-orange-700 hover:bg-orange-800 text-white py-2 px-4 rounded-md shadow-md transition">
            Donate Now
          </button>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-8 border-t border-orange-500 pt-4 text-center text-sm text-gray-200">
        &copy; {new Date().getFullYear()} Your Foundation Name. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
