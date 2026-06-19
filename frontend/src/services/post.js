export async function getPostBySlug(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/slug/${slug}`,
  );
  const { data = {} } = await res.json();
  const post = data.post;
  return post;
}

export async function getPosts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post/list`);
  const {
    data: { posts = {} },
  } = await response.json();
  return posts;
}
