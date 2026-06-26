import { requireUser } from "@/lib/access";
import ChangePasswordForm from "@/components/cms/ChangePasswordForm";

export default async function AccountPage() {
  const user = await requireUser();
  return (
    <div>
      <div className="mb-5 rounded-[14px] border border-[#e6eae8] bg-white p-6">
        <div className="text-[15px] font-semibold">{user.name}</div>
        <div className="mt-0.5 text-[12.5px] text-[#71807a]">
          {user.email} ·{" "}
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </div>
      </div>
      <ChangePasswordForm />
    </div>
  );
}
