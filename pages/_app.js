import "../styles/globals.css";
import GeneralNav from "@/components/GeneralNav";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <GeneralNav />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
