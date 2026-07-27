"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { formatEventDate } from "@/lib/format-event-date";
import { groupsWithLocation, hasUpcomingEvent } from "@/lib/map-groups";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export type MapGroup = {
  id: string;
  name: string;
  slug: string;
  city: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  nextEventTitle: string | null;
  nextEventDateTime: string | null; // ISO string, serializable desde el server component
  nextEventAddress: string | null;
  socialMediaUrl: string;
};

const DEFAULT_CENTER: [number, number] = [-9.19, -75.0152]; // centro aproximado de LatAm

export function DirectoryMap({ groups }: { groups: MapGroup[] }) {
  const withLocation = groupsWithLocation(groups);

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={4}
      style={{ height: "420px", width: "100%", borderRadius: "0.75rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {withLocation.map((group) => {
        const showEvent = hasUpcomingEvent(group.nextEventTitle, group.nextEventDateTime);

        return (
          <Marker key={group.id} position={[group.latitude, group.longitude]}>
            <Popup>
              <div className="min-w-[180px]">
                <p className="font-semibold">{group.name}</p>
                <p className="text-xs text-ink-soft">
                  {group.city}, {group.country}
                </p>

                {showEvent && group.nextEventDateTime && (
                  <div className="mt-2 border-t border-black/10 pt-2 text-xs">
                    <p className="font-semibold">{group.nextEventTitle}</p>
                    <p>{formatEventDate(new Date(group.nextEventDateTime))}</p>
                    {group.nextEventAddress && <p>{group.nextEventAddress}</p>}
                  </div>
                )}

                <a
                  href={group.socialMediaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-xs font-medium text-forest underline"
                >
                  Red social ↗
                </a>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
