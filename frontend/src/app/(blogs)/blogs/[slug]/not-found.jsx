import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container xl:max-w-screen-xl">
      <div className="flex justify-center pt-10">
        <div>
          <p className="text-xl font-bold text-red-600 mb-8">
            هیچ پستی با این مشخصات یافت نشد!
          </p>
          <Link href="/blogs" className="text-secondary-700">
            رفتن به صفحه پست؟
          </Link>
        </div>
      </div>
    </div>
  );
}
