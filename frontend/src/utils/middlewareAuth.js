export async function middlewareAuth(req) {
  const accessToken = req.cookies.get("accessToken");
  const refreshToken = req.cookies.get("refreshToken");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`,
    {
      method: "GET",
      headers: {
        Cookie: `${accessToken?.name}=${accessToken?.value}; ${refreshToken?.name}=${refreshToken?.value}`,
      },
      credentials: "include",
    },
  );
  const { data: { user } = {} } = await response.json();
  return user;
}
