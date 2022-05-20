import "../styles/globals.css";
import GeneralNav from "@/components/GeneralNav";
import { AuthProvider } from "@/lib/auth";
import withLoader from "@/hocs/withLoader";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <GeneralNav />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default withLoader(MyApp);
