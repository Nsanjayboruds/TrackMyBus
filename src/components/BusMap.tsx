"use client";

import { MapContainer, TileLayer, Polyline, Marker, Popup, CircleMarker } from "react-leaflet";
import L from "leaflet";

import { Doc } from "../../convex/_generated/dataModel";

interface BusMapProps {
  routes: Doc<"routes">[];
  buses: Array<Doc<"buses"> & { route: Doc<"routes"> | null }>;
  selectedRoute: Doc<"routes"> | null | undefined;
}

export function BusMap({ routes, buses, selectedRoute }: BusMapProps) {
  const routesToShow = selectedRoute ? [selectedRoute] : routes;

  // Default center
  const defaultCenter: [number, number] = routes.length
    ? [routes[0].stops[0].latitude, routes[0].stops[0].longitude]
    : [40.7128, -74.006]; // NYC fallback

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        {/* Base map */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Draw routes */}
        {routesToShow.map(route => (
          <Polyline
            key={route._id}
            positions={route.stops.map(stop => [stop.latitude, stop.longitude])}
            pathOptions={{ color: route.color || "blue", weight: 4, dashArray: "5,5" }}
          />
        ))}

        {/* Draw stops */}
        {routesToShow.flatMap(route =>
          route.stops.map(stop => (
            <Marker
              key={stop.id}
              position={[stop.latitude, stop.longitude]}
              icon={L.divIcon({
                className: "custom-stop-icon",
                html: `<div style="background:white;border:2px solid ${route.color};border-radius:50%;width:12px;height:12px"></div>`
              })}
            >
              <Popup>{stop.name}</Popup>
            </Marker>
          ))
        )}

        {/* Draw buses */}
        {buses.map(bus => (
          <CircleMarker
            key={bus._id}
            center={[bus.currentLatitude, bus.currentLongitude]}
            radius={10}
            pathOptions={{
              color: "white",
              weight: 2,
              fillColor:
                bus.status === "active"
                  ? "#10B981"
                  : bus.status === "delayed"
                  ? "#F59E0B"
                  : "#6B7280",
              fillOpacity: 1,
            }}
          >
            <Popup>
              <div>
                <strong>Bus {bus.busNumber}</strong>
                <br />
                Status: {bus.status}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
