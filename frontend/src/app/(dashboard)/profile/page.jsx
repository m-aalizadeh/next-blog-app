import PostsTable from "./posts/_/components/PostsTable";
import { Suspense } from "react";
import CardsWrapper from "./_components/CardWrapper";
import Fallback from "@/ui/Fallback";
export default async function page() {
  return (
    <div>
      <h1 className="text-xl mb-6 text-secondary-700">داشبورد</h1>
      <Suspense fallback={<Fallback />}>
        <CardsWrapper />
      </Suspense>
      <h2 className="text-xl mb-4 text-secondary-700">آخرین پست ها</h2>
      <Suspense fallback={<Fallback />}>
        <PostsTable query="sort=latest&limit=5" />
      </Suspense>
    </div>
  );
}
