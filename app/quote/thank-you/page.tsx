import { Suspense } from "react";
import ThankYouClient from "./ThankYouClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <ThankYouClient />
    </Suspense>
  );
}