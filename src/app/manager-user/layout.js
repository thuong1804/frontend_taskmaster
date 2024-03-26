import DashboardLayout from "@/component/layouts/DashboardLayout";
import HeaderLayout from "@/component/layouts/HeaderLayout";

export default function ManagerUserLayout({
    children,
}) {
    return (
        <DashboardLayout>
            <HeaderLayout>
                {children}
            </HeaderLayout>
        </DashboardLayout>

    )
}