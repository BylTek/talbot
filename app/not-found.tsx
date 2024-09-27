import Link from "next/link";

export default function Custom404() {
    return (
      <main className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mt-2">Page Not Found</p>
        <p className="text-md mt-4 text-gray-600">Oops! The page you&apos;e looking for doesn&apos;t exist.</p>
        <Link 
          href="/" 
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go back home
        </Link>
      </main>
    );
  }
  