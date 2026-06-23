import vazirFont from "@/constants/localFont";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/context/Auth";

export const metadata = {
  title: {
    template: "%s | بلااگ اپ",
    default: "بلاگ اپ",
  },
  description: "وب اپلیکیشن مدیریت بلاگ ها و نظرات کاربران",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body className={`${vazirFont.variable} font-sans min-h-screen`}>
        <Toaster />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
