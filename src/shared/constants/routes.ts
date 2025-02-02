export const ROUTES = {
  PROFILE: '/profile',
  ORDER: '/order',
  ORDER_ID: (orderId: string) => `/order/${orderId}`,
  CART: '/cart',
  AUTH: '/auth',
  PIZZA: '/',
}

export const PROTECTED_ROUTES = [ROUTES.PROFILE, ROUTES.ORDER, ROUTES.CART]
