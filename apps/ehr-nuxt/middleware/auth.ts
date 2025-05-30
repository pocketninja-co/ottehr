import { useUserStore } from '~/store/user' // Adjusted path assuming store is in `store` directory at root
                                          // Nuxt 3 uses `~/` for project root alias

export default defineNuxtRouteMiddleware((to, from) => {
  // This log helps in debugging which routes the middleware is applied to.
  // console.log(`Auth middleware: Navigating from ${from.path} to ${to.path}`);

  const userStore = useUserStore();

  // If user is not authenticated
  if (!userStore.isAuthenticated) {
    // And trying to access a path other than /login
    if (to.path !== '/login') {
      // console.log('User not authenticated and not on /login. Redirecting to /login.');
      // Store the intended path in query to redirect back after login
      // This is a common pattern, but not explicitly requested for this step's login page.
      // For now, we'll just redirect to /login without the returnTo query.
      return navigateTo('/login');
      // Example with returnTo:
      // return navigateTo(`/login?returnTo=${encodeURIComponent(to.fullPath)}`);
    }
    // If on /login and not authenticated, do nothing, allow access.
    // console.log('User not authenticated but is on /login. Allowing access.');
    return;
  }

  // If user IS authenticated
  // And somehow tries to navigate to /login page, redirect them to a default authenticated page (e.g., /visits)
  // This prevents an authenticated user from seeing the login page again.
  if (userStore.isAuthenticated && to.path === '/login') {
    // console.log('User is authenticated but trying to access /login. Redirecting to /visits.');
    return navigateTo('/visits');
  }

  // console.log('User is authenticated or route does not require auth. Allowing navigation.');
  // If authenticated and not going to /login, or if the route is /login and not authenticated, allow navigation
});
