import { Authenticated, Unauthenticated, useQuery, useMutation, useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { BusTracker } from "./components/BusTracker";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";


export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm h-16 flex justify-between items-center border-b shadow-sm px-4">
        <h2 className="text-xl font-semibold text-blue-600">🚌 Live Bus Tracker</h2>
        <SignOutButton />
      </header>
      <main className="flex-1 p-4">
        <Content />
      </main>
      <Toaster />
    </div>
  );
}

function Content() {
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const initializeSampleData = useMutation(api.simulator.initializeSampleData);
  const simulateBusMovement = useAction(api.simulator.simulateBusMovement);

  useEffect(() => {
    // Initialize sample data when component mounts
    initializeSampleData();
  }, [initializeSampleData]);

  useEffect(() => {
    // Simulate bus movement every 5 seconds for demo
    const interval = setInterval(() => {
      simulateBusMovement();
    }, 5000);

    return () => clearInterval(interval);
  }, [simulateBusMovement]);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Authenticated>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Real-Time Bus Tracking</h1>
          <p className="text-gray-600">
            Welcome back, {loggedInUser?.email ?? "friend"}! Track buses in real-time with live updates.
          </p>
        </div>
        <BusTracker />
      </Authenticated>
      
      <Unauthenticated>
        <div className="max-w-md mx-auto mt-20">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">🚌 Live Bus Tracker</h1>
            <p className="text-xl text-gray-600">Sign in to track buses in real-time</p>
          </div>
          <SignInForm />
        </div>
      </Unauthenticated>
    </div>
  );
}
