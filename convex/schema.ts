import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  routes: defineTable({
    name: v.string(),
    color: v.string(),
    stops: v.array(v.object({
      id: v.string(),
      name: v.string(),
      latitude: v.number(),
      longitude: v.number(),
      order: v.number(),
    })),
  }),
  
  buses: defineTable({
    routeId: v.id("routes"),
    busNumber: v.string(),
    currentLatitude: v.number(),
    currentLongitude: v.number(),
    nextStopId: v.string(),
    status: v.union(v.literal("active"), v.literal("delayed"), v.literal("offline")),
    lastUpdated: v.number(),
    estimatedArrival: v.optional(v.number()),
  }).index("by_route", ["routeId"]),
  
  busUpdates: defineTable({
    busId: v.id("buses"),
    latitude: v.number(),
    longitude: v.number(),
    timestamp: v.number(),
    speed: v.optional(v.number()),
  }).index("by_bus", ["busId"])
    .index("by_timestamp", ["timestamp"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
