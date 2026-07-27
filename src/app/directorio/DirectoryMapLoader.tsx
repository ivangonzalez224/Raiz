"use client";

import dynamic from "next/dynamic";
import type { MapGroup } from "./DirectoryMap";

const DirectoryMap = dynamic(
  () => import("./DirectoryMap").then((mod) => mod.DirectoryMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] w-full items-center justify-center rounded-xl bg-canvas-dim text-sm text-ink-soft">
        Cargando mapa...
      </div>
    ),
  },
);

export function DirectoryMapLoader({ groups }: { groups: MapGroup[] }) {
  return <DirectoryMap groups={groups} />;
}
