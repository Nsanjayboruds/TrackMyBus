import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { BusMap } from "./BusMap";
import { RouteList } from "./RouteList";
import { BusList } from "./BusList";
import { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";

export function BusTracker() {
  const routes = useQuery(api.buses.getAllRoutes) || [];
  const buses = useQuery(api.buses.getAllBuses) || [];
  const [selectedRouteId, setSelectedRouteId] = useState<Id<"routes"> | null>(null);

  const selectedRoute = selectedRouteId ? routes.find(r => r._id === selectedRouteId) : null;
  const filteredBuses = selectedRouteId 
    ? buses.filter(bus => bus.routeId === selectedRouteId)
    : buses;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map View */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Live Map</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live Updates
            </div>
          </div>
          <BusMap 
            routes={routes} 
            buses={filteredBuses} 
            selectedRoute={selectedRoute}
          />
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Route Selection */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Routes</h3>
          <RouteList 
            routes={routes}
            selectedRouteId={selectedRouteId}
            onRouteSelect={setSelectedRouteId}
          />
        </div>

        {/* Bus List */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {selectedRoute ? `${selectedRoute.name} Buses` : 'All Buses'}
          </h3>
          <BusList buses={filteredBuses} />
        </div>
      </div>
    </div>
  );
}
