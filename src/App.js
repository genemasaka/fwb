import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import $ from 'jquery';
import { Modal, Button } from 'react-bootstrap';

function App() {
  const [address, setAddress] = useState(null);
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [modalProduct, setModalProduct] = useState(null);
  const handleClose = () => setShow(false);

  const provider = new ethers.BrowserProvider(window.ethereum);

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
          <div class="product card mb-2" style="width: 18rem;" >
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${product}</h5>
              <p class="card-text">${price}ETH</p>
            </div>
          </div>
        `
        productCard.addEventListener("click", () => {
            setShow(true);
            setModalProduct(item);
        });
        catalogue.appendChild(productCard);
      })
    });
  } 

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <nav class="navbar bg-body-tertiary" >
        <div class="container-fluid" >
          <a class="navbar-brand">flight with birds</a>
          <button id="connect" className="btn btn-outline-success" onClick={handleLogin}>Connect Wallet</button>
          <button id="addy" className=" btn btn-outline-success" style={{'visibility' : 'hidden',}}>{address}</button>
        </div>
      </nav>
      <div id="catalogue" className="mt-5 d-flex flex-lg-wrap justify-content-lg-around"></div>
   
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>{modalProduct ? modalProduct.product : ''}</Modal.Title>
          </Modal.Header>
          <Modal.Body id="modal_body" className="text-center">
            <img src={ modalProduct ? modalProduct.image : ''} width="400px" height="400px" style={{'borderRadius': '5px'}}/>
          </Modal.Body>
          <Modal.Footer>
            <p className="mt-2">{modalProduct ? modalProduct.price : ''}ETH</p>
            <Button variant="dark" id="purchase-btn">
              Purchase
            </Button>
          </Modal.Footer>
        </Modal>
      
    </>
  );
}

export default App;

