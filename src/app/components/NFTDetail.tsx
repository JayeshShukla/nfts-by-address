import Copy from "../icons/Copy";
import copy from "copy-to-clipboard";

const NFTDetail = ({ item, i }: { item: any; i: number }) => {
  const handleClick = () => {
    copy(`${item.contract.address}`);
  };

  return (
    <div
      style={{
        height: "fit-content",
        width: "fit-content",
        marginTop: "50px",
      }}
      key={i}
    >
      <img
        src={item.metadata.image}
        style={{ width: "200px", height: "200px" }}
      />
      <div className="text-2xl">{item.metadata.name}</div>
      <div className="text-sm">
        {item.id.tokenId.substr(item.id.tokenId.length - 4)}
      </div>
      <div
        style={{ display: "flex", cursor: "pointer" }}
        onClick={() => handleClick()}
      >
        <div className="text-base">{`${item.contract.address.substr(
          0,
          4
        )}...${item.contract.address.substr(
          item.contract.address.length - 4
        )}`}</div>
        <div style={{ marginLeft: "5px" }}>
          <Copy />
        </div>
      </div>
      <div>{item.metadata.description}</div>
      <a href={`https://basescan.org/address/${item.contract.address}`}>
        <button
          className={
            "disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm"
          }
        >
          View on etherscan
        </button>
      </a>
    </div>
  );
};

export default NFTDetail;
