import "bootstrap/dist/css/bootstrap.min.css"; 
import "../styles/globals.css";
import { SolanaWalletProvider } from "../utils/SolanaWalletProvider";

function MyApp({ Component, pageProps }) {
  return (
    <SolanaWalletProvider>
      <Component {...pageProps} />
    </SolanaWalletProvider>
  );
}

export default MyApp;
