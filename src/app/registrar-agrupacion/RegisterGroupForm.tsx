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

      <div>
        <label className="block text-sm font-medium">
          Red social <span className="text-red-700">*</span>
        </label>
        <input
          name="socialMediaUrl"
          type="text"
          required
          placeholder="https://instagram.com/tu_cuenta (o Facebook, TikTok, etc.)"
          className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
        />
        <p className="mt-1 text-xs text-ink-soft">
          Cualquier red social donde te puedan encontrar — no tiene que ser Instagram.
        </p>
        {state.fieldErrors?.socialMediaUrl && (
          <p className="mt-1 text-xs text-red-700">{state.fieldErrors.socialMediaUrl}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Sitio web (opcional)</label>
          <input
            name="website"
            placeholder="https://..."
            className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">WhatsApp (opcional)</label>
          <input
            name="whatsapp"
            className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Email de contacto (opcional)</label>
        <input
          name="email"
          type="email"
          className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
        />
      </div>

      <fieldset className="rounded-lg border border-black/10 p-4">
        <legend className="px-1 text-sm font-medium">Próximo evento (opcional)</legend>
        <p className="text-xs text-ink-soft">
          Si lo completas, agrega al menos título, dirección y fecha/hora.
        </p>
        {state.fieldErrors?.nextEventTitle && (
          <p className="mt-2 rounded-md bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
            ⚠ {state.fieldErrors.nextEventTitle}
          </p>
        )}

        <div className="mt-3 space-y-3">
          <div>
            <label className="block text-sm font-medium">Título</label>
            <input
              name="nextEventTitle"
              placeholder="Ej. Cubo de la verdad — Parque Kennedy"
              className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">¿De qué se trata?</label>
            <textarea
              name="nextEventDescription"
              rows={3}
              placeholder="Breve descripción de la actividad"
              className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
            />
            {state.fieldErrors?.nextEventDescription && (
              <p className="mt-1 text-xs text-red-700">
                {state.fieldErrors.nextEventDescription}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Dirección exacta</label>
              <input
                name="nextEventAddress"
                placeholder="Calle, referencia, ciudad"
                className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Fecha y hora</label>
              <input
                name="nextEventDateTime"
                type="datetime-local"
                className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Indicaciones a seguir</label>
            <textarea
              name="nextEventInstructions"
              rows={3}
              placeholder="Cómo llegar, punto de encuentro, qué hacer al llegar"
              className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
            />
            {state.fieldErrors?.nextEventInstructions && (
              <p className="mt-1 text-xs text-red-700">
                {state.fieldErrors.nextEventInstructions}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Requerimientos o sugerencias
            </label>
            <textarea
              name="nextEventRequirements"
              rows={3}
              placeholder="Ropa cómoda, agua, protector solar, traer material propio, etc."
              className="mt-1 w-full rounded-md border border-black/15 px-3 py-2"
            />
            {state.fieldErrors?.nextEventRequirements && (
              <p className="mt-1 text-xs text-red-700">
                {state.fieldErrors.nextEventRequirements}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      {state.error && <p className="text-sm text-red-700">{state.error}</p>}

      <SubmitButton />
    </form>
  );
}
