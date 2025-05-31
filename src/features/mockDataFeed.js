// mockDataFeed.js

// Mock function to simulate live price changes
export function simulatePriceFeed(baseAssets) {
  return baseAssets.map(asset => {
    const priceFluctuation = (Math.random() - 0.5) * 0.1; // ±5% variation
    const newPrice = parseFloat(
      (asset.currentPrice * (1 + priceFluctuation)).toFixed(2)
    );
    return {
      ...asset,
      currentPrice: newPrice,
    };
  });
}

// Mock top 10 crypto assets
export const mockCryptoAssets = [
  { symbol: 'BTC', name: 'Bitcoin', currentPrice: 67000 },
  { symbol: 'ETH', name: 'Ethereum', currentPrice: 3600 },
  { symbol: 'BNB', name: 'Binance Coin', currentPrice: 580 },
  { symbol: 'SOL', name: 'Solana', currentPrice: 180 },
  { symbol: 'XRP', name: 'XRP', currentPrice: 0.52 },
  { symbol: 'ADA', name: 'Cardano', currentPrice: 0.45 },
  { symbol: 'DOGE', name: 'Dogecoin', currentPrice: 0.14 },
  { symbol: 'AVAX', name: 'Avalanche', currentPrice: 36 },
  { symbol: 'DOT', name: 'Polkadot', currentPrice: 7.8 },
  { symbol: 'LINK', name: 'Chainlink', currentPrice: 17.2 },
];

// Mock top 10 stock assets
export const mockStockAssets = [
  { symbol: 'AAPL', name: 'Apple', currentPrice: 195 },
  { symbol: 'MSFT', name: 'Microsoft', currentPrice: 410 },
  { symbol: 'GOOGL', name: 'Alphabet', currentPrice: 156 },
  { symbol: 'AMZN', name: 'Amazon', currentPrice: 180 },
  { symbol: 'META', name: 'Meta Platforms', currentPrice: 290 },
  { symbol: 'TSLA', name: 'Tesla', currentPrice: 210 },
  { symbol: 'NVDA', name: 'NVIDIA', currentPrice: 980 },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway', currentPrice: 420 },
  { symbol: 'V', name: 'Visa', currentPrice: 245 },
  { symbol: 'JNJ', name: 'Johnson & Johnson', currentPrice: 160 },
];
