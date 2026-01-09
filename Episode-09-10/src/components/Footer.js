const Footer = () => {
  return (
    <footer className="mt-16 bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Brand */}
          <div>
            <h2 className="mb-3 text-xl font-bold text-white">
              Food App 🍔
            </h2>
            <p className="text-sm text-gray-400">
              Built while learning the Namaste React series.
              A modern food ordering UI using React & Tailwind CSS.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Cart</li>
              <li className="hover:text-white cursor-pointer">Grocery</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-3 font-semibold text-white">Support</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Help Center</li>
              <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 font-semibold text-white">Contact</h3>
            <p className="text-sm text-gray-400">📧 kaushindersinghraghav@gmail.com</p>
            <p className="text-sm text-gray-400">📍 India</p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gray-700"></div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Food App. All rights reserved.
          </p>

          <p className="text-gray-400">
            Made with ❤️ using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
