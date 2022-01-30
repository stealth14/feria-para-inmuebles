import "../styles/globals.css";
import GeneralNav from "@/components/GeneralNav";
import { AuthProvider } from "@/lib/auth";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <GeneralNav />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
