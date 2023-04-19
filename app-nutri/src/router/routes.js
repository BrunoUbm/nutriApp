
const routes = [
  {
    path: '/',
    component: () => import('src/pages/BuscarClientes.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/PageCalc.vue')
  }
]

export default routes
