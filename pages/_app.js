import { useEffect } from "react";
import "styles/globals.css";

import { getAll } from "lib/requests/property";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const init = async () => {
      await getAll();
    };

    init();
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
