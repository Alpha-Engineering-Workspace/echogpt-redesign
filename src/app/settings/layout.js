import ProtectedLayout from "@/components/layout/ProtectedLayout";

export default function SettingsLayout({ children }) {
  return (
    <ProtectedLayout>
      {children}
    </ProtectedLayout>
  );
}