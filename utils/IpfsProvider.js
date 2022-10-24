import React, { useMemo, createContext, useContext } from "react";
import axios from "axios";

const IpfsContext = createContext();

export const ipfsContext = () => useContext(IpfsContext);
export const IpfsProvider = ({ children }) => {

  const postAccountInfo = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJsonToIPFS",
        data: {
            "name": name,
            "description": desc,
            "image": ImgHash
        },
        headers: {
            'pinata_api_key': `${process.env.pinataKey}`,
            'pinata_secret_api_key': `${process.env.pinataSecret}`,
        },
    });
    } catch (error) {
      console.error(error);
    }
  }

  const memoizedState = useMemo(() => ({
    postAccountInfo,
  }));

  return (
    <IpfsContext.Provider value={memoizedState}>
      {children}
    </IpfsContext.Provider>
  );
};
