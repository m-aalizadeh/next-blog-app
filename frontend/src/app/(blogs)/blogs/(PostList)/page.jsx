import PostList from "../_components/PostList";
import { getPosts } from "@/services/post";
import setCookieOnReq from "@/utils/setCookieOnReq";
import { cookies } from "next/headers";
import queryString from "query-string";
export const metadata = {
  title: "بلاگ ها",
};

async function Blog({ searchParams }) {
  const queries = queryString.stringify(await searchParams);
  const cookie = await cookies();
  const options = setCookieOnReq(cookie);
  const posts = await getPosts(queries, options);

  const { search } = await searchParams;
  return (
    <div>
      {search ? (
        <p className="mb-4 text-secondary-700">
          {!posts.length
            ? "هیچ پستی با این مشخصات پیدا نشد"
            : `نشان دادن ${posts.length} نتیجه برای`}
          <span className="font-bold">&quot;{search}&quot;</span>
        </p>
      ) : null}
      <PostList posts={posts} />
    </div>
  );
}

export default Blog;
