import {
  CheckCircle2Icon,
  CircleXIcon,
  InfoIcon,
  LoaderIcon,
  OctagonAlertIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Toaster
        position="top-center"
        richColors
        duration={5000}
        hotkey={["esc", "alt", "ctrl"]}
        expand
        gap={3}
        theme="dark"
        visibleToasts={3}
        icons={{
          error: <TriangleAlertIcon className="w-4 h-4" />,
          loading: <LoaderIcon className="w-4 h-4" />,
          success: <CheckCircle2Icon className="w-4 h-4" />,
          info: <InfoIcon className="w-4 h-4" />,
          warning: <OctagonAlertIcon className="w-4 h-4" />,
          close: <CircleXIcon className="w-4 h-4" />,
        }}
        swipeDirections={["top", "right"]}
        toastOptions={{ duration: 5000 }}
        mobileOffset={20}
        className="transition-all ease-in-out duration-500"
      />
      <main className="py-3">
        <Navbar />
        <Outlet />
      </main>
    </>
  );
};

export default App;
