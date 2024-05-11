import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/index.tsx";
import A from "./pages/Nalc/index.tsx";
import NalcNow from "./pages/NalcNow/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function Main() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
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
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default Main;
