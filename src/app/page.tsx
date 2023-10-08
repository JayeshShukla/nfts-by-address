"use client";
import { use, useState } from "react";
import NFTDetail from "./components/NFTDetail";

const Home = () => {
  const [walletaddress, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState<any>();
  const [network, setNetwork] = useState("");

  const handleChange = (e: any) => {
    setNetwork(e.target.value);
  };

  const fetchNFTs = async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    if (process.env.ALCHEMY_API_KEY && network) {
      let baseURL = `https://${network}.g.alchemy.com/nft/v2/${process.env.ALCHEMY_API_KEY}`;
      let fetchby;
      let ENDPOINTS;
      if (walletaddress && collection) {
        fetchby = `/getNFTs`;
        ENDPOINTS = `?owner=${walletaddress}&contractAddresses[]=${collection}`;
      } else if (walletaddress) {
        fetchby = `/getNFTs`;
        ENDPOINTS = `?owner=${walletaddress}`;
      } else {
        fetchby = `/getNFTsForCollection`;
        ENDPOINTS = `?contractAddress=${collection}`;
      }
      try {
        await fetch(
          `${baseURL}${fetchby}${ENDPOINTS}&withMetadata=true&pageSize=100`,
          options
        )
          .then((response) => response.json())
          .then((response) => setNFTs(response?.ownedNfts));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <div>
          Selected Network for NFT's:
          <select
            name="cars"
            id="cars"
            className="mb-8 text-lime-500 bg-black w-1/2 ml-5"
            onChange={(e) => handleChange(e)}
          >
            <option value="">Select</option>
            <option value="eth-mainnet">ETHERIUM MAINNET</option>
            <option value="eth-goerli">ETHERIUM GOERLI (TEST NET)</option>
            <option value="eth-sepolia">ETHERIUM SEPOLIA (TEST NET)</option>
            <option value="polygon-mainnet">POLYGON MAINNET</option>
            <option value="polygon-mumbai">POLYGON MUMBAI (TEST NET)</option>
            <option value="arb-mainnet">ARBITRUM MAINNET</option>
            <option value="arb-goerli">ARBITRUM GOERLI (TEST NET)</option>
            <option value="opt-mainnet">OPTIMISM MAINNET</option>
            <option value="opt-goerli">OPTIMISM GOERLI (TEST NET)</option>
          </select>
        </div>

        <input
          type={"text"}
          placeholder="Add your wallet address"
          className="p-2 rounded text-lime-500 bg-[#2f2f31]"
          onChange={(e) => setWalletAddress(e.target.value)}
          value={walletaddress}
        ></input>
        <input
          type={"text"}
          placeholder="Add the collection address"
          className="p-2 rounded text-lime-500 bg-[#2f2f31]"
          onChange={(e) => setCollectionAddress(e.target.value)}
        ></input>
        <button
          className={
            "disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
          }
          onClick={() => fetchNFTs()}
        >
          Let's go!
        </button>
      </div>
      <div
        className="p-8 h-[30rem] w-full grid grid-cols-5 gap-4"
        style={{ overflowY: "scroll" }}
      >
        {NFTs &&
          NFTs?.map((item: any, i: number) => <NFTDetail item={item} i={i} />)}
      </div>
    </div>
  );
};

export default Home;
