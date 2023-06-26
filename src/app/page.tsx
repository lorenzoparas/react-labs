'use client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FileTree from "./elements/FileTree";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FileTree />
  }
]);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <RouterProvider router={router} />
      </div>
    </main>
  )
}
