import { Layout } from "@/components/layout";
import { headers } from "next/headers";
import { UserAgentProvider } from "../components/providers/userAgentProvider";
import "./globals.css";

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const userAgent = headers().get("user-agent") || "Unknown";

  return (
    <html lang="en">
      <body>
        <UserAgentProvider userAgent={userAgent}>
          <Layout>{children}</Layout>
        </UserAgentProvider>
      </body>
    </html>
  );
};

export default RootLayout;
