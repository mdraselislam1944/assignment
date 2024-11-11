"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type UserAgent = string;

type UserAgentContextType = {
  userAgent: UserAgent | undefined;
};

type UserAgentProviderProps = {
  children: ReactNode;
  userAgent?: UserAgent;
};

const UserAgentContext = createContext<UserAgentContextType | undefined>(
  undefined
);

export const useUserAgentContext = (): UserAgentContextType => {
  const context = useContext(UserAgentContext);
  if (context === undefined) {
    throw new Error(
      "useUserAgentContext must be used within a UserAgentProvider"
    );
  }
  return context;
};

export const UserAgentProvider: React.FC<UserAgentProviderProps> = ({
  children,
  userAgent: userAgentProp,
}) => {
  const [userAgent, setUserAgent] = useState<UserAgent | undefined>(
    userAgentProp
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserAgent(window.navigator.userAgent);
    }
  }, []);

  return (
    <UserAgentContext.Provider value={{ userAgent }}>
      {children}
    </UserAgentContext.Provider>
  );
};
