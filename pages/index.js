import React, { useState, useEffect } from "react";
import HeadComponent from '../components/Head';
import { PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import Product from "../components/Product";

// Constants
// const TWITTER_HANDLE = "_buildspace";
// const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // This will fetch the users' public key (wallet address) from any wallet we support
  const { publicKey } = useWallet();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (publicKey) {
      fetch(`/api/fetchProducts`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          console.log("Products", data);
        });
    }
  }, [publicKey]);

  const renderNotConnectedContainer = () => (
    <div>
      <img src="https://media.giphy.com/media/6CovzgyTig7M4/giphy.gif" alt="emoji" />

      <div className="button-container">
        <WalletMultiButton className="cta-button connect-wallet-button" />
      </div>    
    </div>
  );

  const renderItemBuyContainer = () => (
    <div className="products-container">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
  
  return (
    <div className="App">
      <HeadComponent/>
      <div className="container">
        <header className="header-container">
          <p className="header"> 😳 Wizarding Black Market 🧙🏿‍♂️</p>
          <p className="sub-text">The only wands store thast accepts magic beans</p>
        </header>

        <main>
          {publicKey ? renderItemBuyContainer() : renderNotConnectedContainer()}
        </main>

        {/* <div className="footer-container">
          <img alt="GitHub Logo" className="twitter-logo" src="github_logo.png" />
          <a
            className="footer-text"
            href={'#'}
          >{`built by RinneX`}</a>
        </div> */}
      </div>
    </div>
  );
};

export default App;
