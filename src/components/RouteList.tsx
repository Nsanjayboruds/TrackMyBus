import { Doc, Id } from "../../convex/_generated/dataModel";

interface RouteListProps {
  routes: Doc<"routes">[];
  selectedRouteId: Id<"routes"> | null;
  onRouteSelect: (routeId: Id<"routes"> | null) => void;
}

export function RouteList({ routes, selectedRouteId, onRouteSelect }: RouteListProps) {
  return (
    <div className="space-y-2">
      <button
        onClick={() => onRouteSelect(null)}
        className={`w-full text-left p-3 rounded-lg border transition-colors ${
          selectedRouteId === null
            ? 'bg-blue-50 border-blue-200 text-blue-900'
            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
        }`}
      >
        <div className="font-medium">All Routes</div>
        <div className="text-sm text-gray-500">View all buses</div>
      </button>
      
      {routes.map(route => (
        <button
          key={route._id}
          onClick={() => onRouteSelect(route._id)}
          className={`w-full text-left p-3 rounded-lg border transition-colors ${
            selectedRouteId === route._id
              ? 'bg-blue-50 border-blue-200 text-blue-900'
              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: route.color }}
            ></div>
            <span className="font-medium">{route.name}</span>
          </div>
          <div className="text-sm text-gray-500">
            {route.stops.length} stops
          </div>
        </button>
      ))}
    </div>
  );
}
