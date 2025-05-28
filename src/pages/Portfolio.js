import React, { useEffect, useState } from "react";

const Portfolio = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    // Fetch Top 10 Cryptos
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    )
      .then((res) => res.json())
      .then((data) => setCryptoData(data))
      .catch((err) => console.error("Crypto Fetch Error:", err));

    // Fetch Top 10 Stocks (replace demo API key)
    fetch(
      "https://financialmodelingprep.com/api/v3/stock/actives?apikey=SFyy7qRQ2j1NAet4Mg256NeeTqHPzmNs"
    )
      .then((res) => res.json())
      .then((data) => setStockData(data.mostActiveStock.slice(0, 10)))
      .catch((err) => console.error("Stock Fetch Error:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Top 10 Cryptocurrencies</h1>
      <ul className="mb-8">
        {cryptoData.map((coin) => (
          <li key={coin.id} className="mb-2">
            {coin.name} ({coin.symbol.toUpperCase()}): ${coin.current_price.toLocaleString()}
          </li>
        ))}
      </ul>

      <h1 className="text-2xl font-bold mb-4">Top 10 Stocks</h1>
      <ul>
        {stockData.map((stock) => (
          <li key={stock.ticker} className="mb-2">
            {stock.companyName} ({stock.ticker}): ${parseFloat(stock.price).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Portfolio;
