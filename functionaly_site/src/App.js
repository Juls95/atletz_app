import { React, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from "react-bootstrap"

/**
 *                  Update Athlete & Fan Profile with LSP3Profile:
 * 
 * Commented becasue it is not used in the moment because of following error:
 * BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
 * Lot of time wasted trying to fix it, but didn't find the solution. 
 */
//import { LSPFactory } from '@lukso/lsp-factory.js';
//import { ERC725 } from '@erc725/erc725.js';
//import KeyManager from './LSP6KeyManager.json';
//import UniversalProfile from './UniversalProfile.json';
//import jsonFile from './sample-metadata.json';
/**
 * End comment
 * 
 */
export let connectedAddress;
export let isWalletConnected;

function App() {
  // Static variables
  const RPC_ENDPOINT = 'https://rpc.testnet.lukso.gateway.fm';
  const IPFS_GATEWAY = 'https://api.universalprofile.cloud/ipfs';
  const CHAIN_ID = 2828;
  const PRIVATE_KEY = '0x...'; // from env file: 
  const UNIVERSAL_PROFILE_ADDRESS = '0x...';
  const [athleteName, setAthleteName] = useState("");
  const [athleteSport, setAthleteSport] = useState("");
  const [athleteExperiece, setAthleteExperience] = useState("")
  const [walletAddress, setWalletAddress] = useState("");
  /*Estas son las funciones que usan l moemtnto de craer el Token*/
  const handleChangeAthleteName = (event) => setAthleteName(event.target.value)
  const handleChangeAthleteSport = (event) => setAthleteSport(event.target.value)
  const handleChangeAthleteExperiece = (event) => setAthleteExperience(event.target.value);
  const web3 = new Web3(RPC_ENDPOINT);
 
  /**
   *                  Update Athlete & Fan Profile with LSP3Profile:
   * 
              // Step 1 - Create a new LSP3Profile JSON file
            /*   const lspFactory = new LSPFactory(RPC_ENDPOINT, {
                deployKey: PRIVATE_KEY,
                chainId: CHAIN_ID,
              });
  
    End comment
  */
  /*Connect Wallet Functions*/
  async function requestAccount() {
    if (window.ethereum) {
      console.log('detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        connectedAddress = accounts[0]
        isWalletConnected = Boolean(accounts[0]);
        connectWallet = accounts[0];
        console.log("account: " + accounts[0])

      } catch (error) {
        console.log("error account request");
      }

    } else {
      alert("Meta mask not deteched");
    }
  }

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }
  
  function changeQuantity(change) {
    var quantityInput = document.getElementById("quantity");
    var currentQuantity = parseInt(quantityInput.value);
    currentQuantity += change;

    if (currentQuantity < 1) currentQuantity = 1;
    if (currentQuantity > 100) currentQuantity = 100;

    quantityInput.value = currentQuantity;
}
  /**
   *                  Update Athlete & Fan Profile with LSP3Profile:
   * 
  
  /*
      async function editProfileInfo() {
        // Step 2 - Upload our JSON file to IPFS
        const uploadResult = await lspFactory.UniversalProfile.uploadProfileData(
          jsonFile.LSP3Profile
          
        );
        console.log('Upload Result:', uploadResult.url)
        const lsp3ProfileIPFSUrl = uploadResult.url;
      
        // Step 3.1 - Setup erc725.js
        const schema = [
          {
            name: 'LSP3Profile',
            key: '0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5',
            keyType: 'Singleton',
            valueContent: 'JSONURL',
            valueType: 'bytes',
          },
        ];
      
        const erc725 = new ERC725(
          schema,
          UNIVERSAL_PROFILE_ADDRESS,
          web3.currentProvider,
          {
            ipfsGateway: IPFS_GATEWAY,
          },
        );
      
        // Step 3.2 - Encode the LSP3Profile data (to be written on our UP)
        const encodedData = erc725.encodeData({
          keyName: 'LSP3Profile',
          value: {
            hashFunction: 'keccak256(utf8)',
            // Hash our LSP3 metadata JSON file
            hash: web3.utils.keccak256(JSON.stringify(jsonFile)),
            url: lsp3ProfileIPFSUrl,
          },
        });
      
        // Step 4.1 - Load our EOA
        const myEOA = web3.eth.accounts.wallet.add(PRIVATE_KEY);
        console.log('EOA:', myEOA.address);
        console.log('Private KEY:', PRIVATE_KEY);
        console.log('UP Address:', UNIVERSAL_PROFILE_ADDRESS);
        //console.log('UP JSON:', UniversalProfile);
        //console.log('Key manager:', KeyManager);
        // Step 4.2 - Create instances of our Contracts
        const universalProfileContract = new web3.eth.Contract(
          UniversalProfile.abi,
          UNIVERSAL_PROFILE_ADDRESS,
        );
        console.log('Encoded Data Values:', encodedData.values)
        const keyManagerAddress = await universalProfileContract.methods
          .owner()
          .call();
        const keyManagerContract = new web3.eth.Contract(
          KeyManager.abi,
          keyManagerAddress,
        );
      
        // Step 4.3 - Set updated LSP3Profile metadata to our Universal Profile
      
        // encode the setData payload
        const abiPayload = await universalProfileContract.methods[
          'setDataBatch(bytes32[],bytes[])'
        ](encodedData.keys, encodedData.values).encodeABI();
      
        // execute via the KeyManager, passing the UP payload
        await keyManagerContract.methods
          .execute(abiPayload)
          .send({ from: myEOA.address, gasLimit: 300_000 });
      }   
  
        End comment
  */
  return (


    <div className="App">
      <head>
        <title>Web Page with Image, Button, and Forms</title>
      </head>
      <body>
        <div class="header-image">
          <img src="Atletz_png.png" alt="Header Image" />
          <div class="button-box">
            {/*Connect Wallet Buttons*/}
            <Row >
              <Card style={{ color: "#000", }}>
                <Form>
                  <Form.Group controlId="formCreateToken" className='Form-Control'>
                    <Form.Label className='Form-Text'>Connect Wallet</Form.Label>
                    <Col>
                      <Button variant="secondary"
                        onClick={connectWallet} className='Button'>Connect Wallet</Button>

                    </Col>
                  </Form.Group>
                </Form>
              </Card>
            </Row>
          </div>
        </div>

        <div class="form-container">
          <div class="column left-column">
            <form >
              <Row className="Card">
                <Card style={{ color: "#000", }}>
                  <Form>
                    <Form.Group controlId="formCreateToken">
                      <Form.Label>Create Fan Profile</Form.Label>
                      <Col>
                        <Form.Text className="text-muted">User Name</Form.Text>
                        <Form.Control type="artistAddress" placeholder="Enter your Nickname:" onChange={handleChangeAthleteName} />

                        <Form.Text className="text-muted">Sport</Form.Text>
                        <Form.Control type="tokenAddress" placeholder="Enter your sport" onChange={handleChangeAthleteSport} />

                        <Form.Text className="text-muted">Location</Form.Text>
                        <Form.Control type="tokenExchangeAddress" placeholder="Enter your experience on this sport:" onChange={handleChangeAthleteExperiece} />
                        <Button variant="secondary" /*onClick={editProfileInfo()}*/>Create Athlete</Button>

                      </Col>
                    </Form.Group>
                  </Form>
                </Card>
              </Row>

            </form>
          </div>
          <div class="column middle-column">
            <form >


              <Row className="Card">
                <Card style={{ color: "#000", }}>
                  <Form>
                    <Form.Group controlId="formCreateToken">
                      <Form.Label>Create Fan Profile</Form.Label>
                      <Col>
                        <Form.Text className="text-muted">User Name</Form.Text>
                        <Form.Control type="artistAddress" placeholder="Enter your Nickname:" onChange={handleChangeAthleteName} />

                        <Form.Text className="text-muted">Sport</Form.Text>
                        <Form.Control type="tokenAddress" placeholder="Enter your sport" onChange={handleChangeAthleteSport} />

                        <Form.Text className="text-muted">Location</Form.Text>
                        <Form.Control type="tokenExchangeAddress" placeholder="Enter your experience on this sport:" onChange={handleChangeAthleteExperiece} />
                        <Button variant="secondary" /*onClick={editProfileInfo()}*/>Create Athlete</Button>

                      </Col>
                    </Form.Group>
                  </Form>
                </Card>
              </Row>

            </form>
          </div>
          <div class="column right-column">

            <form >


            <div class="mint-container">
        <h1>Support an Athlete</h1>
        <p>Connect with your favorite sports through promising athletes! Empower talent and share triumphs!</p>
        
        <div class="quantity-selector">
            <button onclick="changeQuantity(-1)">-</button>
            <input type="number" id="quantity" value="1" min="1" max="100"/>
            <button onclick="changeQuantity(1)">+</button>
        </div>

        <button class="mint-button">Mint Now</button>
    </div>


            </form>
          </div>
        </div>
      </body>


    </div>
  );
}

export default App;
