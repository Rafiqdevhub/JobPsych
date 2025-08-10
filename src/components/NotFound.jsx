import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="relative isolate min-h-[70vh] flex items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
      {/* Background accents */}
      <div className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div
          className="relative left-1/2 aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-indigo-300 to-purple-300 opacity-30 sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg leading-7 text-gray-600 max-w-xl mx-auto">
          Sorry, we couldn’t find the page you’re looking for. It might have
          been moved or deleted.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-4">
          <Link
            to="/"
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-purple-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go to Home
          </Link>
          <Link
            to="/dashboard"
            className="text-sm font-semibold text-indigo-700 hover:text-indigo-800"
          >
            Go to Dashboard
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
