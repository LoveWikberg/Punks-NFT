import React, { useEffect, useState } from "react";
import MintPunkContract from "./contracts/MintPunks.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import { ethers } from "ethers";

function App() {
  const [storageValue, setStorageValue] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [mintContract, setMintContract] = useState(null);
  const [ownedTokes, setOwnedTokes] = useState([]);
  const [amountTokes, setAmountTokes] = useState();
  const [mintPrice, setMintPrice] = useState();

  useEffect(() => {
    const initiate = async () => {
      await initStates();
    }

    initiate();
  }, [])

  const initStates = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork2 = MintPunkContract.networks[networkId];

      const instance2 = new web3.eth.Contract(
        MintPunkContract.abi,
        deployedNetwork2 && deployedNetwork2.address,
      );

      const tokens = await instance2.methods.tokensOfOwner().call({ from: accounts[0] });
      console.log(tokens);

      const amountok = await instance2.methods.totalSupp().call({ from: accounts[0] });

      const price = await instance2.methods.TOKEN_PRICE().call();
      setMintPrice(price);

      setOwnedTokes(tokens);
      setAmountTokes(amountok);
      setWeb3(web3);
      setAccounts(accounts);
      setMintContract(instance2);
      // setStorageValue(response);

    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  const updatefan = async () => {
    const response = await mintContract.methods.getSenderTest().call({ from: accounts[0] });
    console.log(response);
    setStorageValue(response);
  }

  const mintTest = async (e) => {
    if (e.keyCode === 13) {
      const amount = parseInt(e.target.value);
      // const price = parseInt(mintPrice, 10);
      console.log(mintPrice * amount);
      console.log(mintPrice);
      console.log(amount);
      console.log(ethers.BigNumber.from(mintPrice));

      await mintContract.methods.presaleMint(amount)
        .send({ from: accounts[0], value: mintPrice * amount });
    }
  }

  const sharesfan = async () => {
    const response = await mintContract.methods.getTotalShares().call();
    console.log(response);
  }

  const reciverfan = async () => {
    await mintContract.methods.releaseShares("0xEAE1b5133f97fbbe0ab8b7578907d395d41ab46b").send({ from: accounts[0] });
  }

  const recivedfan = async () => {
    const response = await mintContract.methods.releasedShares().call();
    console.log(ethers.utils.formatEther(response));
  }

  return (
    <>
      {
        !web3
          ? <div>Loading Web3, accounts, and contract...</div>
          :
          <div className="App">
            {/* <input placeholder="Skriv ett nummer och klicka enter" onKeyDown={async (e) => await changeContractValue(e)} /> */}
            <input placeholder="Antal punks?" onKeyDown={async (e) => await mintTest(e)} />
            <button onClick={() => updatefan()}>update</button>
            <button onClick={() => sharesfan()}>get total shares</button>
            <button onClick={() => reciverfan()}>recieve</button>
            <button onClick={() => recivedfan()}>total recieved</button>
            <h1>{amountTokes}</h1>
            {
              ownedTokes.map((token, key) =>
                <h1 key={key}>{token}</h1>
              )
            }
          </div>
      }
    </>
  );
}

export default App;
