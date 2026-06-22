import { getPosts } from "@/services/post";
import setCookieOnReq from "@/utils/setCookieOnReq";
import { cookies } from "next/headers";
import queryString from "query-string";
import PostList from "app/blogs/_components/PostList";

export default async function page({ params, searchParams }) {
  const { categorySlug } = await params;
  const queries = `${queryString.stringify(
    await searchParams,
  )}&categorySlug=${categorySlug}`;
  const cookieStore = await cookies();
  const options = setCookieOnReq(cookieStore);
  const posts = await getPosts(queries, options);
  return (
    <div>
      {posts.length ? (
        <PostList posts={posts} />
      ) : (
        <p className="text-lg text-secondary-600">
          پستی در این دسته بندی پیدا نشد
        </p>
      )}
    </div>
  );
}
