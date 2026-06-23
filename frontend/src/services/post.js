import http from "./http";
export async function getPostBySlug(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/slug/${slug}`,
  );
  const { data = {} } = await res.json();
  const post = data.post;
  return post;
}

export async function getPosts(queries, options) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/list?${queries}`,
    options,
  );
  const {
    data: { posts = [] },
  } = await response.json();
  return posts;
}

export async function likePostApi(postId) {
  return http.post(`/post/like/${postId}`).then(({ data }) => data.data);
}

export async function bookmarkPostApi(postId) {
  return http.post(`/post/bookmark/${postId}`).then(({ data }) => data.data);
}

export async function getPostsByCategory(queries) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/list?${queries}`,
  );
  const {
    data: { posts = {} },
  } = await response.json();
  return posts;
}

export async function deletePostApi({ id, options }) {
  return http
    .delete(`/post/remove/${id}`, options)
    .then(({ data }) => data.data);
}
