import ProtectedLayout from "@/components/layout/ProtectedLayout";

export default function ProfileLayout({ children }) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
