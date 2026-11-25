export const site = {
  email: null as string | null,
  social: [] as { name: string; url: string }[],
  legal: [
    { name: 'Aviso legal', path: '/aviso-legal', id: 'aviso' },
    { name: 'Privacidad', path: '/privacidad', id: 'privacidad' },
    { name: 'Cookies', path: '/cookies', id: 'cookies' },
    { name: 'Condiciones de compra', path: '/condiciones-de-compra', id: 'compra' },
    { name: 'Envíos y devoluciones', path: '/envios-y-devoluciones', id: 'envios' },
  ],
} as const
