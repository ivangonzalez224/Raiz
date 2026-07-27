"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { LatLng } from "./LocationPickerMap";

// Leaflet necesita `window`/`document`, así que nunca puede renderizarse en
// el servidor — de ahí el ssr: false.
const LocationPickerMap = dynamic(
  () => import("./LocationPickerMap").then((mod) => mod.LocationPickerMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[260px] w-full items-center justify-center rounded-lg bg-canvas-dim text-sm text-ink-soft">
        Cargando mapa...
      </div>
    ),
  },
);

const DEFAULT_CENTER: LatLng = { lat: -12.0464, lng: -77.0428 }; // Lima, Perú

export function LocationPicker({
  defaultLatitude,
  defaultLongitude,
}: {
  defaultLatitude?: number | null;
  defaultLongitude?: number | null;
}) {
  const initialPosition: LatLng | null =
    defaultLatitude != null && defaultLongitude != null
      ? { lat: defaultLatitude, lng: defaultLongitude }
      : null;

  const [position, setPosition] = useState<LatLng | null>(initialPosition);
  const [showPicker, setShowPicker] = useState(initialPosition !== null);

  return (
    <div>
      <label className="block text-sm font-medium">Ubicación en el mapa (opcional)</label>
      <p className="mt-1 text-xs text-ink-soft">
        Marcá el punto exacto donde se reúnen habitualmente, así aparece en el mapa del
        directorio.
      </p>

      {!showPicker ? (
        <button
          type="button"
          onClick={() => setShowPicker(true)}
          className="mt-2 rounded-md border border-black/15 px-4 py-2 text-sm font-semibold"
        >
          Elegir ubicación en el mapa
        </button>
      ) : (
        <div className="mt-2">
          <LocationPickerMap
            initialPosition={position ?? DEFAULT_CENTER}
            onChange={setPosition}
          />
          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="font-mono text-xs text-ink-soft">
              {position
                ? `${position.lat.toFixed(5)}, ${position.lng.toFixed(5)}`
                : "Hacé clic en el mapa para marcar el punto"}
            </p>
            <button
              type="button"
              onClick={() => {
                setPosition(null);
                setShowPicker(false);
              }}
              className="whitespace-nowrap text-xs font-medium text-red-700 underline"
            >
              Quitar ubicación
            </button>
          </div>
        </div>
      )}

      {position && (
        <>
          <input type="hidden" name="latitude" value={position.lat} />
          <input type="hidden" name="longitude" value={position.lng} />
        </>
      )}
    </div>
  );
}
