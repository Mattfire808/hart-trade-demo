// src/features/autoStakeEngine.js

import { v4 as uuidv4 } from 'uuid';

/**
 * Simulated Auto Stake Engine for Hart Trade
 * This manages stake settings, asset selection, monitoring, and mock trades.
 */

const getRandomAssets = (allAssets, count) => {
  const shuffled = [...allAssets].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const initializeAutoStake = ({
  initialAmount,
  stakeType,
  assetCount,
  stakeDuration,
  autoCashoutPercentage,
  profitTrigger,
  lossTrigger,
  perAssetStakePercentage,
  allCrypto,
  allStocks,
}) => {
  const assets = stakeType === 'crypto'
    ? getRandomAssets(allCrypto, assetCount)
    : stakeType === 'stocks'
    ? getRandomAssets(allStocks, assetCount)
    : getRandomAssets([...allCrypto, ...allStocks], assetCount);

  const perAssetInvestment = (initialAmount * perAssetStakePercentage) / 100;

  const trades = assets.map((asset) => ({
    id: uuidv4(),
    symbol: asset.symbol,
    name: asset.name,
    type: asset.type,
    entryPrice: asset.price,
    currentPrice: asset.price,
    investment: perAssetInvestment,
    status: 'active',
    history: [],
  }));

  return {
    sessionId: uuidv4(),
    initialAmount,
    remainingBalance: initialAmount - perAssetInvestment * trades.length,
    stakeType,
    assetCount,
    stakeDuration,
    autoCashoutPercentage,
    profitTrigger,
    lossTrigger,
    perAssetStakePercentage,
    startTime: new Date().toISOString(),
    trades,
    profits: 0,
  };
};

export const updateTradePrices = (session, liveAssets) => {
  const updatedTrades = session.trades.map((trade) => {
    const match = liveAssets.find((a) => a.symbol === trade.symbol);
    if (!match || trade.status !== 'active') return trade;

    const change = ((match.price - trade.entryPrice) / trade.entryPrice) * 100;

    // Auto-sell on profit or loss
    if (change >= session.profitTrigger) {
      session.profits += trade.investment * (1 + change / 100);
      session.remainingBalance += trade.investment * (1 + change / 100);
      return { ...trade, status: 'sold-profit', currentPrice: match.price };
    } else if (change <= -session.lossTrigger) {
      // Reinvest in another asset
      const newAsset = getRandomAssets(liveAssets, 1)[0];
      return {
        ...trade,
        symbol: newAsset.symbol,
        name: newAsset.name,
        type: newAsset.type,
        entryPrice: newAsset.price,
        currentPrice: newAsset.price,
        status: 'reinvested',
        history: [...trade.history, {
          soldAt: match.price,
          reason: 'loss',
          timestamp: new Date().toISOString(),
        }],
      };
    }

    return { ...trade, currentPrice: match.price };
  });

  return { ...session, trades: updatedTrades };
};
