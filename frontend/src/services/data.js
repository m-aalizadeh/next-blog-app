import setCookieOnReq from "@/utils/setCookieOnReq";
import { cookies } from "next/headers";
import { getAllUsersApi } from "./auth";
import { getAllCommentsApi } from "./comment";
import { getPosts } from "./post";

export async function fetchCardData() {
  const cookieStore = await cookies();
  const options = setCookieOnReq(cookieStore);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const data = await Promise.all([
      getAllUsersApi(options),
      getAllCommentsApi(options),
      getPosts(),
    ]);

    const numberOfUsers = Number(data[0].users?.length ?? "0");
    const numberOfComments = Number(data[1]?.commentsCount ?? "0");
    const numberOfPosts = Number(data[2].posts?.length ?? "0");

    return {
      numberOfComments,
      numberOfPosts,
      numberOfUsers,
    };
  } catch (error) {
    throw new Error("خطا در بارگذاری اطلاعات");
  }
}

export async function fetchLatestPosts() {
  try {
    const posts = await getPosts("sort=latest&limit=5");
    return posts;
  } catch (error) {
    throw new Error(error?.reponse?.data?.message);
  }
}
