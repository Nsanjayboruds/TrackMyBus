import { mutation, action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

// Simulate bus movement for demo purposes
export const simulateBusMovement = action({
  args: {},
  handler: async (ctx): Promise<{ updated: number }> => {
    const buses = await ctx.runQuery(api.buses.getAllBuses);
    
    for (const bus of buses) {
      if (bus.route && bus.status === "active") {
        // Simulate small movement
        const latOffset = (Math.random() - 0.5) * 0.001; // ~100m
        const lngOffset = (Math.random() - 0.5) * 0.001;
        
        const newLat = bus.currentLatitude + latOffset;
        const newLng = bus.currentLongitude + lngOffset;
        
        // Find next stop (simplified)
        const currentStopIndex = bus.route.stops.findIndex((stop: any) => stop.id === bus.nextStopId);
        const nextStopIndex = (currentStopIndex + 1) % bus.route.stops.length;
        const nextStop = bus.route.stops[nextStopIndex];
        
        // Simulate estimated arrival (5-15 minutes)
        const estimatedArrival = Date.now() + (Math.random() * 10 + 5) * 60 * 1000;
        
        await ctx.runMutation(api.buses.updateBusLocation, {
          busId: bus._id,
          latitude: newLat,
          longitude: newLng,
          nextStopId: nextStop.id,
          status: Math.random() > 0.9 ? "delayed" : "active",
          estimatedArrival,
        });
      }
    }
    
    return { updated: buses.length };
  },
});

export const initializeSampleData = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if data already exists
    const existingRoutes = await ctx.db.query("routes").collect();
    if (existingRoutes.length > 0) {
      return { message: "Sample data already exists" };
    }
    
    // Create sample routes
    const route1Id = await ctx.db.insert("routes", {
      name: "Route 42 - Downtown Express",
      color: "#3B82F6",
      stops: [
        { id: "stop1", name: "Central Station", latitude: 40.7589, longitude: -73.9851, order: 1 },
        { id: "stop2", name: "City Hall", latitude: 40.7505, longitude: -73.9934, order: 2 },
        { id: "stop3", name: "Union Square", latitude: 40.7359, longitude: -73.9911, order: 3 },
        { id: "stop4", name: "Washington Square", latitude: 40.7308, longitude: -73.9973, order: 4 },
        { id: "stop5", name: "Brooklyn Bridge", latitude: 40.7061, longitude: -73.9969, order: 5 },
      ],
    });
    
    const route2Id = await ctx.db.insert("routes", {
      name: "Route 15 - Crosstown",
      color: "#EF4444",
      stops: [
        { id: "stop6", name: "East Side Terminal", latitude: 40.7614, longitude: -73.9776, order: 1 },
        { id: "stop7", name: "Midtown Plaza", latitude: 40.7549, longitude: -73.9840, order: 2 },
        { id: "stop8", name: "West Side Hub", latitude: 40.7505, longitude: -73.9934, order: 3 },
        { id: "stop9", name: "Riverside Park", latitude: 40.7829, longitude: -73.9654, order: 4 },
      ],
    });
    
    // Create sample buses
    await ctx.db.insert("buses", {
      routeId: route1Id,
      busNumber: "4201",
      currentLatitude: 40.7589,
      currentLongitude: -73.9851,
      nextStopId: "stop2",
      status: "active",
      lastUpdated: Date.now(),
      estimatedArrival: Date.now() + 8 * 60 * 1000, // 8 minutes
    });
    
    await ctx.db.insert("buses", {
      routeId: route1Id,
      busNumber: "4202",
      currentLatitude: 40.7308,
      currentLongitude: -73.9973,
      nextStopId: "stop5",
      status: "active",
      lastUpdated: Date.now(),
      estimatedArrival: Date.now() + 12 * 60 * 1000, // 12 minutes
    });
    
    await ctx.db.insert("buses", {
      routeId: route2Id,
      busNumber: "1501",
      currentLatitude: 40.7614,
      currentLongitude: -73.9776,
      nextStopId: "stop7",
      status: "delayed",
      lastUpdated: Date.now(),
      estimatedArrival: Date.now() + 15 * 60 * 1000, // 15 minutes
    });
    
    return { message: "Sample data initialized successfully" };
  },
});
