import { TriangleAlertIcon } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <TriangleAlertIcon className="w-16 h-16 text-gray-800" />
      <h1 className="text-4xl font-bold text-red-600 mt-2">404</h1>
    </div>
  );
};

export default ErrorPage;
