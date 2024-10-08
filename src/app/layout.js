import { Roboto } from "next/font/google";
import "./globals.css";
import { ProfileProvider } from "../context/ProfileProvider";
import ToastProvider from "../context/ToastProvider";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ProviderNotification } from "@/context/NotificationProvider";
import { ProviderUsers } from "@/context/UsersProvider";

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};



export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <ProfileProvider>
                    <ProviderUsers>
                        <ProviderNotification>
                            <ToastProvider>
                                <AntdRegistry>
                                    {children}
                                </AntdRegistry>
                            </ToastProvider>
                        </ProviderNotification>
                    </ProviderUsers>
                </ProfileProvider>
            </body>
        </html>
    );
}
