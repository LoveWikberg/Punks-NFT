import React, { useEffect, useState } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import MintPunkContract from "./contracts/MintPunks.json";
import getWeb3 from "./getWeb3";
import "./App.css";

function App() {
  const [storageValue, setStorageValue] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [mintContract, setMintContract] = useState(null);
  const [ownedTokes, setOwnedTokes] = useState([]);
  const [amountTokes, setAmountTokes] = useState();

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
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const deployedNetwork2 = MintPunkContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const instance2 = new web3.eth.Contract(
        MintPunkContract.abi,
        deployedNetwork2 && deployedNetwork2.address,
      );

      const tokens = await instance2.methods.tokensOfOwner().call();
      console.log(tokens);

      const amountok = await instance2.methods.totalSupp().call();
      // await instance.methods.set(5).send({ from: accounts[0] });
      // const response = await instance.methods.get().call();

      setOwnedTokes(tokens);
      setAmountTokes(amountok);
      setWeb3(web3);
      setAccounts(accounts);
      setContract(instance);
      setMintContract(instance2);
      // setStorageValue(response);

    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  // const changeContractValue = async (e) => {
  //   if (e.keyCode === 13) {
  //     await contract.methods.set(e.target.value).send({ from: accounts[0] });
  //       // .then(async () => await updatefan());
  //   }
  // };

  const updatefan = async () => {
    const tokenaaa = await mintContract.methods.tokenURIData(1).call();
    console.log(tokenaaa);
    const response = await mintContract.methods.getSenderTest().call();
    console.log(response);
    setStorageValue(response);
  }

  const mintTest = async (e) => {
    if (e.keyCode === 13) {
      const value = parseInt(e.target.value);
      const price = parseInt(0.01, 10);
      console.log(price * value);
      await mintContract.methods.presaleMint(value)
        .send({ from: accounts[0], value: price * value });
    }
    // const tasd = await mintContract.methods.getSenderTest().call();
    // console.log(tasd);
  }

  return (
    <>
      {
        !web3
          ? <div>Loading Web3, accounts, and contract...</div>
          : <div className="App">
            {/* <input placeholder="Skriv ett nummer och klicka enter" onKeyDown={async (e) => await changeContractValue(e)} /> */}
            <input placeholder="Antal punks?" onKeyDown={async (e) => await mintTest(e)} />
            <button onClick={() => updatefan()}>update</button>
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
