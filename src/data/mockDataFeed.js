// src/data/mockDataFeed.js

export function getMockPrices() {
  return {
    crypto: [
      { symbol: "BTC", price: 25000 + Math.random() * 1000 },
      { symbol: "ETH", price: 1600 + Math.random() * 50 },
      { symbol: "ADA", price: 0.35 + Math.random() * 0.05 },
      { symbol: "XRP", price: 0.5 + Math.random() * 0.1 },
      { symbol: "SOL", price: 22 + Math.random() * 5 },
      { symbol: "DOGE", price: 0.06 + Math.random() * 0.01 },
      { symbol: "DOT", price: 5 + Math.random() * 0.5 },
      { symbol: "MATIC", price: 0.75 + Math.random() * 0.1 },
      { symbol: "LINK", price: 6 + Math.random() * 1 },
      { symbol: "LTC", price: 90 + Math.random() * 5 },
    ],
    stocks: [
      { symbol: "AAPL", price: 175 + Math.random() * 5 },
      { symbol: "TSLA", price: 240 + Math.random() * 10 },
      { symbol: "GOOGL", price: 130 + Math.random() * 5 },
      { symbol: "AMZN", price: 120 + Math.random() * 5 },
      { symbol: "MSFT", price: 320 + Math.random() * 10 },
      { symbol: "NFLX", price: 400 + Math.random() * 15 },
      { symbol: "NVDA", price: 460 + Math.random() * 20 },
      { symbol: "META", price: 270 + Math.random() * 8 },
      { symbol: "INTC", price: 35 + Math.random() * 2 },
      { symbol: "AMD", price: 100 + Math.random() * 4 },
    ],
  };
}
