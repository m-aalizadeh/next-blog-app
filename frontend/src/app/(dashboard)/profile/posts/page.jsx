import { Suspense } from "react";
import PostsTable from "./_/components/PostsTable";
import Fallback from "@/ui/Fallback";

export default function page() {
  return (
    <div>
      <Suspense fallback={<Fallback />}>
        <PostsTable />
      </Suspense>
    </div>
  );
}
