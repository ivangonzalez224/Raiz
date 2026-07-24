"use client";

import { useRef } from "react";

type Props = {
  countries: string[];
  cities: string[];
  activityTypes: readonly string[];
  activityTypeLabels: Record<string, string>;
  defaultValues: { country: string; city: string; activity: string; q: string };
};

export function FilterBar({
  countries,
  cities,
  activityTypes,
  activityTypeLabels,
  defaultValues,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      method="get"
      className="mt-8 flex flex-wrap items-center gap-3 rounded-xl bg-canvas-dim p-4"
    >
      <select
        name="country"
        defaultValue={defaultValues.country}
        onChange={() => formRef.current?.requestSubmit()}
        className="rounded-md border border-black/15 bg-white px-3 py-2 text-sm"
      >
        <option value="">País — todos</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select
        name="city"
        defaultValue={defaultValues.city}
        onChange={() => formRef.current?.requestSubmit()}
        className="rounded-md border border-black/15 bg-white px-3 py-2 text-sm"
      >
        <option value="">Ciudad — todas</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <select
        name="activity"
        defaultValue={defaultValues.activity}
        onChange={() => formRef.current?.requestSubmit()}
        className="rounded-md border border-black/15 bg-white px-3 py-2 text-sm"
      >
        <option value="">Tipo — todos</option>
        {activityTypes.map((value) => (
          <option key={value} value={value}>
            {activityTypeLabels[value]}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="q"
        placeholder="Buscar agrupación..."
        defaultValue={defaultValues.q}
        className="min-w-[180px] flex-1 rounded-md border border-black/15 bg-white px-3 py-2 text-sm"
      />

      <button
        type="submit"
        className="rounded-md bg-forest px-4 py-2 text-sm font-semibold text-canvas"
      >
        Buscar
      </button>
    </form>
  );
}
