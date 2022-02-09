import React, { useEffect, useState } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import "./App.css";

function App() {
  const [storageValue, setStorageValue] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);

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

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      await instance.methods.set(5).send({ from: accounts[0] });
      const response = await instance.methods.get().call();

      setWeb3(web3);
      setAccounts(accounts);
      setContract(instance)
      setStorageValue(response);

    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  const changeContractValue = async (e) => {
    if (e.keyCode === 13) {
      await contract.methods.set(e.target.value).send({ from: accounts[0] })
      .then(async () => await updatefan());
    }
  };

  const updatefan = async () => {
    const response = await contract.methods.get().call();
    setStorageValue(response);
  }

  return (
    <>
      {
        !web3
          ? <div>Loading Web3, accounts, and contract...</div>
          : <div className="App">
            <input placeholder="Skriv ett nummer och klicka enter" onKeyDown={async (e) => await changeContractValue(e)} />
            <button onClick={() => updatefan()}>update</button>
            <div>Jag är sugen på {storageValue} bärs</div>
          </div>
      }
    </>
  );
}

export default App;
