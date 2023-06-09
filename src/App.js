import './App.css';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import $ from 'jquery';
import { Modal, Button } from 'react-bootstrap';
import abi from './fwbContract.json';

function App() {
  const [address, setAddress] = useState(null);
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [modalProduct, setModalProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleClose = () => setShow(false);

  const provider = new ethers.BrowserProvider(window.ethereum);
  const fwbContractAddress = '0xF998F82E58406Bf7153eBbFDB3c0048F89651B8e';

  const handleLogin = async () => {
    if (window.ethereum !== 'null') {
      const accounts = await provider.send("eth_requestAccounts", [])
      setAddress(accounts[0])
      document.getElementById('connect').style.visibility = "hidden"
      document.getElementById('addy').style.visibility = "visible"
      document.getElementById('catalogue').style.visibility = "visible"
    } else {
      alert("Please install Metamask🦊")
    }
  }

  const getProducts = () => {
    const catalogue = document.getElementById('catalogue');
    fetch('./products.json', {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(function(response){
      return response.json();
    }).then(function(products){
      setProducts((prevProducts) => [...prevProducts, ...products])
      console.log(products)
      products.forEach((item)=> {
        const {id, product, price, image} = item;
       
        const productCard = document.createElement('div')
        productCard.innerHTML = `
          <div class="product card mb-2 text-white bg-dark" style="width: 18rem;" >
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body pb-5">
              <h5 class="card-title">${product}</h5>
              <p class="card-text">${price}ETH</p>
            </div>
          </div>
        `
        productCard.addEventListener("click", () => {
            setShow(true);
            setModalProduct(item);
            setSelectedProduct(id);
        });
        catalogue.appendChild(productCard);
      })
    });
  } 
  const handlePurchase = async() => {
    if (!selectedProduct) {
      return;
    }
  
    const signer = await provider.getSigner(address);
    const fwbContract = new ethers.Contract(fwbContractAddress, abi, signer);
    const product = products.find(item => item.id === selectedProduct);
  
    try {
      const tx = await fwbContract.buyProduct(parseInt(selectedProduct));
      await tx.wait();
  
      // Update the UI to indicate that the purchase was successful
      alert(`You have purchased ${product.product} for ${product.price}ETH`);
      handleClose();
    } catch (error) {
      console.error(error);
      alert(`Failed to purchase ${product.product}: ${error.message}`);
    }
  }
  
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
<nav class="navbar bg-body-tertiary" >
  <div class="container-fluid" >
    <h2 class="navbar-brand primary ">flightwithbirds</h2>
    <div class="outer">
      <button id="connect" class="inner btn" style={{'display': address ? 'none' : 'block'}} onClick={handleLogin}>Connect Wallet</button>
      <button id="addy" class="inner btn" style={{'visibility' : 'hidden',}}>{address}</button>
    </div>
  </div>
</nav>

      <div id="catalogue" className="mt-5 d-lg-flex flex-lg-wrap justify-content-lg-around"></div>
   
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>{modalProduct ? modalProduct.product : ''}</Modal.Title>
          </Modal.Header>
          <Modal.Body id="modal_body" className="text-center">
            <img src={ modalProduct ? modalProduct.image : ''} alt="product" width="400px" height="500px" style={{'borderRadius': '5px'}}/>
          </Modal.Body>
          <Modal.Footer>
            <p className="mt-2">{modalProduct ? modalProduct.price : ''}ETH</p>
            <Button variant="dark" id="purchase-btn" onClick={handlePurchase}>
              Purchase
            </Button>
          </Modal.Footer>
        </Modal>
      
    </>
  );
}

export default App;

