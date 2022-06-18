import React, { useState, useEffect } from "react";
import "./styles.css";
import { getNft, transferNft } from "./components/interact";
import { Button } from "react-bootstrap";
import Papa from "papaparse";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "./wallet/connectors";
import { changeNetwork } from "./wallet/Network";
import { useDispatch } from "react-redux";
import { getProvider } from "./components/utils/StorageUtil";

export default function App() {
  const [csvData, setCsvData] = useState([]);
  const [nftData, setNftData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const tempArray = [];

  const dispatch = useDispatch();
  const { library, chainId, account, activate, deactivate, active } =
    useWeb3React();

  useEffect(() => {
    const provider = getProvider();
    if (provider) activate(connectors[provider]);
  }, []);

  // useEffect(() => {
  //   if (window.ethereum) {
  //     // when first loading, check network
  //     window.ethereum
  //       .request({ method: "eth_chainId" })
  //       .then((chainId) => {
  //         checkIfAvaxNetwork(chainId);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });

  //     // when network changed, check network
  //     window.ethereum.on("chainChanged", (chainId) => {
  //       checkIfAvaxNetwork(chainId);
  //     });
  //   }
  // }, []);

  // const checkIfAvaxNetwork = (chainId) => {
  //   console.log("---chainid---", chainId);
  //   if (chainId !== "0xa869") {
  //     dispatch({ type: ALERT_UPDATE_OPEN, payload: true });
  //     dispatch({
  //       type: ALERT_UPDATE_DATA,
  //       payload: { severity: "error", message: "Wrong Network" },
  //     });
  //     changeNetwork("fuji");
  //   }
  // };

  // useEffect(() => {
  //   setInterval(function () {
  //     setIsLoading(false);
  //   }, 1000);
  //   getMintedNft();
  // }, []);

  // const getMintedNft = () => {
  //   // const res = await getNft();
  //   getNft().then((res) => {
  //     console.log("res - ", res);
  //     setNftData(res);
  //   });
  // };

  // const batchClick = () => {
  //   console.log("csvData - ", csvData);
  //   csvData.map((data) => {
  //     if (data[1] !== undefined) {
  //       console.log(data[1]);
  //       nftData.map((nft) => {
  //         // console.log('nft - ', nft);
  //         if (nft.name === data[1]) {
  //           var selectedData = [data[0], nft.tokenID];
  //           // console.log('selectedData - ', selectedData);
  //           tempArray.push(selectedData);
  //           console.log("tempArray - ", tempArray);
  //           transferNft(tempArray);
  //         }
  //         return 0;
  //       });
  //     }
  //     return 0;
  //   });
  // };

  return (
    <div className="App p-5">
      {isLoading ? (
        <>
          <h2 className="text-center mb-5">Loading ...</h2>
        </>
      ) : (
        <>
          <h2 className="text-center mb-5">Please click batch process!</h2>
          <div className="d-flex justify-content-between">
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={(e) => {
                const files = e.target.files;
                // console.log(files);
                if (files) {
                  // console.log(files[0]);
                  Papa.parse(files[0], {
                    complete: function (results) {
                      // console.log("Finished:", results.data);
                      setCsvData(results.data);
                    },
                  });
                }
              }}
            />
            <Button variant="primary" onClick={() => batchClick()}>
              Batch process
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
