import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
import { useState } from 'react';

function App() {
  const [address, setAddress] = useState(null);
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
  return (
    
<>
 <nav class="navbar bg-body-tertiary" >
  <div class="container-fluid" >
    
      <a class="navbar-brand">flight with birds</a>
      <button id="connect" class="btn btn-outline-success" onClick={handleLogin}>Connect Wallet</button>
      <button id="addy" class=" btn btn-outline-success" style={{'visibility' : 'hidden',}}>{address}</button>

  </div>
</nav>
<div id="catalogue"  style={{'visibility' : 'hidden'}}>
<div class="row row-cols-1 row-cols-md-2 g-2 ">
  <div class="col">
    <div class="card w-50">
      <img src="..." class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card w-50">
      <img src="..." class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card w-50">
      <img src="..." class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card w-50">
      <img src="..." class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
</div>
</div>
   </>
  );
}

export default App;
