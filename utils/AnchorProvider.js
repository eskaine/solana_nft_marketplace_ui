import { useState, useMemo, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import idl from "../contracts/idl.json";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
const network = clusterApiUrl("devnet");
const programID = new PublicKey(idl.metadata.address);
const opts = {
  preflightCommitment: "processed",
};

const AnchorContext = createContext();

const AnchorProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(
      connection,
      window.solana,
      opts.preflightCommitment
    );

    return provider;
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      setWalletAddress(response.publicKey.toString());
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: true });
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Get a Phantom Wallet");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const memoizedState = useMemo(() => ({
    walletAddress, connectWallet, getProvider
  }));

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <AnchorContext.Provider value={memoizedState}>
      {children}
    </AnchorContext.Provider>
  );
};

AnchorProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { AnchorProvider, AnchorContext };
