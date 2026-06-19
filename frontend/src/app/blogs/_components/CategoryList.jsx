import Link from "next/link";
export default async function CategoryList() {
  // await new Promise((res) => setTimeout(() => res(), 2000));
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/category/list`,
  );
  const {
    data: { categories },
  } = await response.json();
  return (
    <ul className="space-y-4">
      <Link href="/blogs">همه</Link>
      {categories.map((category) => {
        return (
          <li key={category._id}>
            <Link href={`/blogs/category/${category.slug}`}>
              {category.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
