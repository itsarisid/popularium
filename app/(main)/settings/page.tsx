import { ProfileForm } from "./components/profile-form"

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Profile Card */}
        <ProfileForm />
      </div>
    </div>
  )
}
