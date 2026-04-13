export interface FaqItem {
  pregunta: string;
  respuesta: string;
}

export const faqs: FaqItem[] = [
  {
    pregunta: '¿Qué tipos de oro compran?',
    respuesta:
      'Compramos todo tipo de oro: joyería (anillos, cadenas, aretes, pulseras), monedas de oro, lingotes, piezas dentales y oro roto o dañado. Aceptamos quilates del 10k al 24k. Si no estás seguro de qué tienes, tráelo y lo evaluamos frente a ti sin ningún compromiso.',
  },
  {
    pregunta: '¿Cómo calculan el precio que me ofrecen?',
    respuesta:
      'Usamos una fórmula transparente: precio spot del oro en ese momento × peso en gramos × porcentaje de pureza según el quilataje. Todo el proceso lo hacemos frente a ti — te mostramos la báscula, el resultado del test de pureza y el precio spot en vivo. No hay números ocultos.',
  },
  {
    pregunta: '¿Dónde nos reunimos para hacer la transacción?',
    respuesta:
      'Nos encontramos en un lugar público y seguro que tú elijas en el área de Phoenix — una cafetería, el lobby de un banco, un centro comercial. Nunca te pedimos que vayas a un lugar privado. La seguridad y tu comodidad son nuestra prioridad.',
  },
  {
    pregunta: '¿Cuánto tiempo tarda todo el proceso?',
    respuesta:
      'La evaluación y el pago toman entre 10 y 20 minutos. Pesamos tu oro, verificamos la pureza con nuestro kit de prueba y calculamos la oferta al instante. Si aceptas, el pago es inmediato — no hay que esperar ni volver otro día.',
  },
  {
    pregunta: '¿Cómo me pagan?',
    respuesta:
      'Pagamos en efectivo o por transferencia bancaria, al momento de la transacción. Tú decides cuál prefieres. No hay cheques que esperar ni demoras de ningún tipo. El dinero es tuyo en cuanto cerramos el trato.',
  },
  {
    pregunta: '¿Qué pasa si no acepto la oferta?',
    respuesta:
      'No pasa absolutamente nada. La evaluación es completamente gratuita y sin compromiso. Si el precio no te convence, te llevas tus piezas de vuelta sin ningún costo ni presión. Queremos que te vayas satisfecho, con o sin venta.',
  },
  {
    pregunta: '¿Necesito traer identificación?',
    respuesta:
      'Sí, es un requisito legal en el estado de Arizona para todas las transacciones de compra de metales preciosos. Necesitas una identificación oficial con foto — licencia de conducir, pasaporte, matrícula consular u otra ID gubernamental válida.',
  },
  {
    pregunta: '¿Compran oro roto o dañado?',
    respuesta:
      'Sí, con mucho gusto. El valor del oro está en su peso y pureza, no en la forma ni el estado de la pieza. Un anillo roto, una cadena enredada o un arrete sin par valen exactamente lo mismo que su equivalente en buen estado. No descartes nada sin preguntar primero.',
  },
];
