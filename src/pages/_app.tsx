import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ReactElement } from "react";

interface AppProps {
  Component: React.ComponentType<any>;
  pageProps: {
    session: any;
    [key: string]: any;
  };
}

export default function App({ Component, pageProps }: AppProps): ReactElement {
  const { session, ...restPageProps } = pageProps;

  return (
    <SessionProvider session={session}>
      <Component {...restPageProps} />
    </SessionProvider>
  );
}
