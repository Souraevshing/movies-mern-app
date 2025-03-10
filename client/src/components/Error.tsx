import { TriangleAlertIcon } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 overflow-hidden">
      <TriangleAlertIcon className="w-16 h-16 text-gray-800" />
      <h1 className="text-4xl font-bold text-red-600 mt-2">404</h1>
      <p className="text-lg text-gray-700">Page Not Found</p>
    </div>
  );
};

export default ErrorPage;
