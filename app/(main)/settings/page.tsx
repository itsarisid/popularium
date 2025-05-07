import PageContainer from "@/layout/page-container";
import { ProfileForm } from "./components/profile-form";

export default function SettingsPage() {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        </div>
        <div className='grid grid-cols-3 gap-4'>

        <ProfileForm />
      </div>
      </div>
    </PageContainer>
  );
}
