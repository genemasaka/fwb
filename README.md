<!--README.md-->

# FlightWithBirds DApp

This is a decentralized application (DApp) that allows users to purchase apparel using testnet cryptocurrency. The application uses the Metamask wallet to connect to the Ethereum network and the ethers.js library to interact with smart contracts.
Visit the app at [fwb](flightwithbirds.vercel.app)

## Installation and Usage

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the application with `npm start`
4. Connect your Metamask wallet to the application by clicking the "Connect Wallet" button
5. Browse the apparel catalogue and click on a product to view more details
6. Purchase a product by clicking the "Purchase" button in the product details modal

## Code Overview

The application is built using React.js and consists of an `App.js` file. The file imports various dependencies, including `ethers.js`, `react-bootstrap`, and a contract ABI file.

The main components of the application include:

- `useState` and `useEffect` hooks for managing component state and lifecycle
- A function for handling the Metamask login process and displaying user wallet address
- A function for fetching and displaying apparel products from a local JSON file
- A modal component for displaying product details and handling the purchase process

The purchase process involves connecting to the Ethereum network through Metamask, using `ethers.js` to interact with a smart contract at a specified address, and sending a transaction to purchase the selected product. `SepoliaEth` is required to make the transacton. You can get some free Sepolia testnet Eth at [Sepolia Faucet](https://sepoliafaucet.com/). The UI is updated to indicate the success or failure of the purchase process.

## Contributing

Contributions to this project are welcome. To contribute, fork the repository and create a pull request with your changes. Please ensure that your code follows the existing style and conventions and that you have tested your changes thoroughly.
