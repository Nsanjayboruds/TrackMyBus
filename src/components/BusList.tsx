import { Doc } from "../../convex/_generated/dataModel";

interface BusListProps {
  buses: Array<Doc<"buses"> & { route: Doc<"routes"> | null }>;
}

export function BusList({ buses }: BusListProps) {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTimeUntilArrival = (estimatedArrival?: number) => {
    if (!estimatedArrival) return null;
    const now = Date.now();
    const diff = estimatedArrival - now;
    const minutes = Math.round(diff / (1000 * 60));
    return minutes > 0 ? `${minutes} min` : 'Arriving';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'delayed': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '🟢';
      case 'delayed': return '🟡';
      case 'offline': return '⚫';
      default: return '⚫';
    }
  };

  if (buses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-4xl mb-2">🚌</div>
        <p>No buses found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {buses.map(bus => {
        const nextStop = bus.route?.stops.find(stop => stop.id === bus.nextStopId);
        const timeUntilArrival = getTimeUntilArrival(bus.estimatedArrival);
        
        return (
          <div key={bus._id} className="p-3 border rounded-lg bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">Bus {bus.busNumber}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bus.status)}`}>
                  {getStatusIcon(bus.status)} {bus.status.toUpperCase()}
                </span>
              </div>
              {timeUntilArrival && (
                <div className="text-sm font-medium text-blue-600">
                  {timeUntilArrival}
                </div>
              )}
            </div>
            
            {bus.route && (
              <div className="text-sm text-gray-600 mb-1">
                <div className="flex items-center gap-1">
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: bus.route.color }}
                  ></div>
                  {bus.route.name}
                </div>
              </div>
            )}
            
            {nextStop && (
              <div className="text-sm text-gray-600">
                Next: <span className="font-medium">{nextStop.name}</span>
              </div>
            )}
            
            <div className="text-xs text-gray-500 mt-2">
              Last updated: {formatTime(bus.lastUpdated)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
