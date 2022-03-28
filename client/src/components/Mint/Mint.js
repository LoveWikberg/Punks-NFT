import React, { useEffect, useState } from "react";
import MintPunkContract from "../../contracts/MintPunks.json";
import getWeb3 from "../../helpers/getWeb3";
import { InputGroup, Button, Input, Container } from 'reactstrap';

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [mintContract, setMintContract] = useState(null);
  const [ownedTokes, setOwnedTokes] = useState([]);
  const [amountTokes, setAmountTokes] = useState();
  const [mintPrice, setMintPrice] = useState();
  const [mintAmount, setMintAmount] = useState(0);
  const [releaseAddress, setReleaseAddress] = useState();
  const [tokenIdToFetch, setTokenIdToFetch] = useState();
  const [newTokenURI, setNewTokenURI] = useState();

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
      const deployedNetwork2 = MintPunkContract.networks[networkId];

      const instance2 = new web3.eth.Contract(
        MintPunkContract.abi,
        deployedNetwork2 && deployedNetwork2.address,
      );

      const tokens = await instance2.methods.tokensOfOwner().call({ from: accounts[0] });
      const amountok = await instance2.methods.totalSupp().call({ from: accounts[0] });
      const price = await instance2.methods.TOKEN_PRICE().call();

      setMintPrice(price);
      setOwnedTokes(tokens);
      setAmountTokes(amountok);
      setWeb3(web3);
      setAccounts(accounts);
      setMintContract(instance2);

    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  const mint = async () => {
    await mintContract.methods.presaleMint(mintAmount)
      .send({ from: accounts[0], value: mintPrice * mintAmount });
  }

  const getTotalShares = async () => {
    const response = await mintContract.methods.getTotalShares().call();
    console.log(response);
  }

  const releaseShares = async () => {
    await mintContract.methods.releaseShares(releaseAddress).send({ from: accounts[0] });
  }

  const getReleasedShares = async () => {
    const response = await mintContract.methods.releasedShares().call();
    // console.log(ethers.utils.formatEther(response));
    console.log(response);
  }

  const getReleasedSharesTo = async () => {
    const response = await mintContract.methods.releasedSharesTo(releaseAddress).call();
    // console.log(ethers.utils.formatEther(response));
    console.log(response);
  }

  const getTokenURIData = async () => {
    const response = await mintContract.methods.tokenURIData(tokenIdToFetch).call();
    console.log(response);
  }

  const changeBaseTokenURI = async () => {
    await mintContract.methods.changeBaseTokenURI(newTokenURI).send({ from: accounts[0] });
  }

  return (
    <>
      {
        !web3
          ? <div>Loading Web3, accounts, and contract...</div>
          :
          <Container className="bg-light border" fluid="sm">
            <InputGroup>
              <Input type="number" placeholder="Mint amount" onChange={e => setMintAmount(parseInt(e.target.value))} />
              <Button onClick={async () => await mint()}>Mint</Button>
            </InputGroup>
            <InputGroup>
              <Input placeholder="Address to release to" onChange={e => setReleaseAddress(e.target.value)} />
              <Button onClick={async () => await releaseShares()}>Release shares</Button>
              <Button onClick={async () => await getReleasedSharesTo()}>Get released shares</Button>
            </InputGroup>
            <InputGroup>
              <Input type="number" placeholder="Token id" onChange={e => setTokenIdToFetch(parseInt(e.target.value))} />
              <Button onClick={async () => await getTokenURIData()}>Get token URI</Button>
            </InputGroup>
            <InputGroup>
              <Input placeholder="Token URI" onChange={e => setNewTokenURI(e.target.value)} />
              <Button onClick={async () => await changeBaseTokenURI()}>Change base token URI</Button>
            </InputGroup>
            <Button onClick={async () => await getTotalShares()}>Get total shares</Button>
            <Button onClick={async () => await getReleasedShares()}>Total released</Button>
            <h1>{amountTokes}</h1>
            {
              ownedTokes.map((token, key) =>
                <h1 key={key}>{token}</h1>
              )
            }
          </Container >
      }
    </>
  );
}

export default App;
