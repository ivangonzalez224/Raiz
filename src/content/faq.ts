import type { FaqItem } from "./types";

export const generalFaqs: FaqItem[] = [
  {
    id: "cosmeticos",
    question: "¿Qué hace que un cosmético no sea vegano?",
    answer:
      'Dos cosas distintas que a veces se confunden: que contenga ingredientes de origen animal (carmín, colágeno, lanolina, queratina) y/o que haya sido testeado en animales. Un producto puede ser "cruelty-free" pero no vegano (sin testeo, con ingredientes animales), o vegano pero testeado en algún mercado que lo exige por ley.',
  },
  {
    id: "cuero-existente",
    question: "¿Puedo seguir usando cuero o lana que ya tengo?",
    answer:
      "La postura más común es: no hace falta desechar lo que ya compraste (eso no revierte nada y genera más desperdicio), pero sí tiene sentido no comprar más productos de origen animal a futuro. El impacto ético está en las decisiones de consumo que vienen, no en vaciar el clóset.",
  },
  {
    id: "vino-cerveza",
    question: "¿El vino y la cerveza son veganos?",
    answer:
      "No siempre. Algunos usan clarificantes de origen animal (gelatina, claras de huevo, colapez) en el proceso de filtrado, aunque no queden restos en el producto final. Existen listados como Barnivore para verificar marcas específicas.",
  },
  {
    id: "miel",
    question: "¿Por qué la miel no es vegana si las abejas no mueren?",
    answer:
      'La apicultura implica manejo del panal, recorte de alas de reinas, sustitución del alimento de la colmena por jarabe de azúcar, y en muchos casos, sacrificio de colmenas al final de temporada. El criterio no es "si duele" sino si se está usando a un animal como recurso.',
  },
  {
    id: "mascotas",
    question: "¿Es incoherente tener mascotas y ser vegano?",
    answer:
      "La distinción habitual es entre relaciones de explotación (criar, comprar y usar animales como producto) y relaciones de cuidado con animales que ya dependen de nosotros por domesticación (perros, gatos rescatados). Adoptar en vez de comprar es la postura más consistente con el rechazo al especismo.",
  },
];
