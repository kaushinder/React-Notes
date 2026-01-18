const Contact = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">
        Contact Us 📞
      </h1>

      <p className="mb-6 text-gray-600">
        Have questions or feedback? Reach out to us.
      </p>

      <div className="rounded-2xl bg-white p-6 shadow-md">
        {/* Contact Info */}
        <p className="mb-2">📧 Email: kaushindersinghraghav@gmail.com</p>
        <p className="mb-2">📞 Phone: +91 6395004998</p>
        <p className="mb-6">📍 Location: India</p>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            aria-label="send message"
            className="mt-2 rounded-lg bg-blue-600 px-6 py-2 text-white font-semibold transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
