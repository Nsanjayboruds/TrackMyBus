import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAllRoutes = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("routes").collect();
  },
});

export const getBusesByRoute = query({
  args: { routeId: v.id("routes") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("buses")
      .withIndex("by_route", (q) => q.eq("routeId", args.routeId))
      .collect();
  },
});

export const getAllBuses = query({
  args: {},
  handler: async (ctx) => {
    const buses = await ctx.db.query("buses").collect();
    const busesWithRoutes = await Promise.all(
      buses.map(async (bus) => {
        const route = await ctx.db.get(bus.routeId);
        return {
          ...bus,
          route,
        };
      })
    );
    return busesWithRoutes;
  },
});

export const updateBusLocation = mutation({
  args: {
    busId: v.id("buses"),
    latitude: v.number(),
    longitude: v.number(),
    nextStopId: v.string(),
    status: v.union(v.literal("active"), v.literal("delayed"), v.literal("offline")),
    estimatedArrival: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    // Update bus location
    await ctx.db.patch(args.busId, {
      currentLatitude: args.latitude,
      currentLongitude: args.longitude,
      nextStopId: args.nextStopId,
      status: args.status,
      lastUpdated: now,
      estimatedArrival: args.estimatedArrival,
    });
    
    // Record the update for history
    await ctx.db.insert("busUpdates", {
      busId: args.busId,
      latitude: args.latitude,
      longitude: args.longitude,
      timestamp: now,
    });
    
    return { success: true };
  },
});

export const createRoute = mutation({
  args: {
    name: v.string(),
    color: v.string(),
    stops: v.array(v.object({
      id: v.string(),
      name: v.string(),
      latitude: v.number(),
      longitude: v.number(),
      order: v.number(),
    })),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("routes", {
      name: args.name,
      color: args.color,
      stops: args.stops,
    });
  },
});

export const createBus = mutation({
  args: {
    routeId: v.id("routes"),
    busNumber: v.string(),
    latitude: v.number(),
    longitude: v.number(),
    nextStopId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("buses", {
      routeId: args.routeId,
      busNumber: args.busNumber,
      currentLatitude: args.latitude,
      currentLongitude: args.longitude,
      nextStopId: args.nextStopId,
      status: "active",
      lastUpdated: Date.now(),
    });
  },
});

export const getBusHistory = query({
  args: { busId: v.id("buses") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("busUpdates")
      .withIndex("by_bus", (q) => q.eq("busId", args.busId))
      .order("desc")
      .take(50);
  },
});
