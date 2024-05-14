import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Landing = lazy(() => import(`./pages/Landing/index.tsx`));
const A = lazy(() => import(`./pages/Nalc/index.tsx`));
const NalcNow = lazy(() => import(`./pages/NalcNow/index.tsx`));

const queryClient = new QueryClient();

function Main() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading..</div>}>
          <Routes>
            <Route path="/">
              <Route index element={<Landing />} />
            </Route>
            <Route path="/nalc">
              <Route index element={<A />} />
            </Route>
            <Route path="/nalcnow">
              <Route index element={<NalcNow />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default Main;
