const router = createBrowserRouter([
 {
  path: "/",
  element: <App />,
  errorElement: <ErrorPage />,
  children: [
   {
    index: true,
    element: <Home />
   }, {
    path: '/login',
    element: <Login />
   }, {
    path: '/signup',
    element: <Signup />
   }, {
    path: '/profiles/:profileId',
    element: <Profile />
   }
  ]
 },
]);