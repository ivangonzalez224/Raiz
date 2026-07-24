"use client";

import { useFormState, useFormStatus } from "react-dom";
import { registerGroup, type RegisterGroupState } from "./actions";
import { activityTypeLabels, activityTypeValues } from "@/lib/validations/group";

const initialState: RegisterGroupState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-forest px-4 py-3 font-semibold text-canvas disabled:opacity-60"
    >
      {pending ? "Enviando..." : "Registrar agrupación"}
    </button>
  );
}

export function RegisterGroupForm() {
  const [state, formAction] = useFormState(registerGroup, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <label className="block text-sm font-medium">Nombre de la agrupación</label>
        <input
          name="name"
          required
          className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
        />
        {state.fieldErrors?.name && (
          <p className="mt-1 text-xs text-red-700">{state.fieldErrors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Descripción</label>
        <textarea
          name="description"
          required
          rows={4}
          className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
        />
        {state.fieldErrors?.description && (
          <p className="mt-1 text-xs text-red-700">{state.fieldErrors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Ciudad</label>
          <input
            name="city"
            required
            className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">País</label>
          <input
            name="country"
            required
            className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">
          Código de país (ISO2, ej. PE, MX, AR)
        </label>
        <input
          name="countryCode"
          required
          maxLength={2}
          className="mt-1 w-24 rounded-md border border-black/15 px-3 py-2 uppercase"
        />
        {state.fieldErrors?.countryCode && (
          <p className="mt-1 text-xs text-red-700">{state.fieldErrors.countryCode}</p>
        )}
      </div>

      <fieldset>
        <legend className="text-sm font-medium">Tipo de activismo</legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {activityTypeValues.map((value) => (
            <label
              key={value}
              className="flex items-center gap-2 rounded-full border border-black/15 px-3 py-1.5 text-sm"
            >
              <input type="checkbox" name="activityTypes" value={value} />
              {activityTypeLabels[value]}
            </label>
          ))}
        </div>
        {state.fieldErrors?.activityTypes && (
          <p className="mt-1 text-xs text-red-700">{state.fieldErrors.activityTypes}</p>
        )}
      </fieldset>

      <div>
        <label className="block text-sm font-medium">
          Frecuencia de encuentro (opcional)
        </label>
        <input
          name="meetingFrequency"
          placeholder="Ej. Semanal"
          className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Instagram (opcional)</label>
          <input
            name="instagram"
            placeholder="https://instagram.com/..."
            className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Sitio web (opcional)</label>
          <input
            name="website"
            placeholder="https://..."
            className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">WhatsApp (opcional)</label>
          <input
            name="whatsapp"
            className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Email de contacto (opcional)
          </label>
          <input
            name="email"
            type="email"
            className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
          />
        </div>
      </div>

      {state.error && <p className="text-sm text-red-700">{state.error}</p>}

      <SubmitButton />
    </form>
  );
}
