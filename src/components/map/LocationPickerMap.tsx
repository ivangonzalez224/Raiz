"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

// Los íconos por defecto de Leaflet se rompen con bundlers como Webpack
// (buscan las imágenes en una ruta relativa que no existe). Los apuntamos
// a una CDN pública para evitar tener que manejar el import de assets.
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export type LatLng = { lat: number; lng: number };

function ClickHandler({ onSelect }: { onSelect: (pos: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

export function LocationPickerMap({
  initialPosition,
  onChange,
}: {
  initialPosition: LatLng;
  onChange: (pos: LatLng) => void;
}) {
  const [position, setPosition] = useState<LatLng>(initialPosition);

  function handleSelect(pos: LatLng) {
    setPosition(pos);
    onChange(pos);
  }

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "260px", width: "100%", borderRadius: "0.5rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} />
      <ClickHandler onSelect={handleSelect} />
    </MapContainer>
  );
}
