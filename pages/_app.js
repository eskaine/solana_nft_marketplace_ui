import "../styles/globals.css";
import { AnchorProvider } from "../utils/AnchorProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AnchorProvider>
      <Component {...pageProps} />
    </AnchorProvider>
  );
}

export default MyApp;
