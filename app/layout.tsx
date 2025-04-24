
import AppLayout from "@/template/app-layout";
import { RecoilRoot } from "recoil";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout>
      {/* <RecoilRoot>
        {children}
        </RecoilRoot> */}
         {children}
    </AppLayout>
  );
}
