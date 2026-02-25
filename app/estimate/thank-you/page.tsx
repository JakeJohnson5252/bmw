import { Suspense } from "react";
import ThankYouClient from "./thankyouclient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYouClient />
    </Suspense>
  );
}