import RecoilContextProvider from "@/provider/recoil-context-provider";
import AppLayout from "@/template/app-layout";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout>
         <RecoilContextProvider>{children}</RecoilContextProvider>
    </AppLayout>
  );
}
