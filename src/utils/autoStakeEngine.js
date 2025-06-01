// src/utils/autoStakeEngine.js

import { getMockPrices } from "../data/mockDataFeed";

let stakeSettings = null;
let stakeState = {
  investedAssets: [],
  bankedProfit: 0,
  balance: 0,
  tradeHistory: [],
};

function saveHistory() {
  localStorage.setItem("autoStakeHistory", JSON.stringify(stakeState.tradeHistory));
}

function loadHistory() {
  const saved = localStorage.getItem("autoStakeHistory");
  if (saved) {
    stakeState.tradeHistory = JSON.parse(saved);
  }
}

export function initializeAutoStake(settings) {
  stakeSettings = settings;
  stakeState.balance = settings.initialInvestment;
  stakeState.investedAssets = [];
  stakeState.bankedProfit = 0;
  stakeState.tradeHistory = [];
  saveHistory();
}

export function runAutoStakeCycle() {
  if (!stakeSettings) return;

  const prices = getMockPrices();
  const allAssets = [];

  if (stakeSettings.assetType === "crypto" || stakeSettings.assetType === "both") {
    allAssets.push(...prices.crypto);
  }
  if (stakeSettings.assetType === "stocks" || stakeSettings.assetType === "both") {
    allAssets.push(...prices.stocks);
  }

  const currentAssets = stakeState.investedAssets.length;
  const targetAssets = stakeSettings.numberOfAssets;

  const stakePerAsset =
    (stakeSettings.percentagePerAsset / 100) * stakeSettings.initialInvestment;

  if (currentAssets < targetAssets) {
    const newAssets = allAssets
      .filter(
        (a) => !stakeState.investedAssets.find((b) => b.symbol === a.symbol)
      )
      .slice(0, targetAssets - currentAssets);

    newAssets.forEach((asset) => {
      const amount = stakePerAsset / asset.price;
      stakeState.investedAssets.push({
        ...asset,
        purchasePrice: asset.price,
        amount,
      });
      stakeState.balance -= stakePerAsset;
      stakeState.tradeHistory.push({
        type: "BUY",
        symbol: asset.symbol,
        amount,
        price: asset.price,
        timestamp: new Date().toISOString(),
      });
    });
  }

  const assetsToReinvest = [];

  stakeState.investedAssets = stakeState.investedAssets.filter((asset) => {
    const livePrice = allAssets.find((a) => a.symbol === asset.symbol)?.price;
    if (!livePrice) return true;

    const change = (livePrice - asset.purchasePrice) / asset.purchasePrice;

    // Auto-sell for gain
    if (change >= stakeSettings.autoSellGain / 100) {
      const profit = asset.amount * livePrice;
      stakeState.bankedProfit += profit;
      stakeState.tradeHistory.push({
        type: "SELL_GAIN",
        symbol: asset.symbol,
        amount: asset.amount,
        price: livePrice,
        gain: profit - asset.amount * asset.purchasePrice,
        timestamp: new Date().toISOString(),
      });
      return false; // remove asset
    }

    // Auto-sell and reinvest for loss
    if (change <= -stakeSettings.autoSellLoss / 100) {
      const reinvestAmount = asset.amount * livePrice;
      stakeState.balance += reinvestAmount;
      stakeState.tradeHistory.push({
        type: "SELL_LOSS",
        symbol: asset.symbol,
        amount: asset.amount,
        price: livePrice,
        loss: asset.amount * asset.purchasePrice - reinvestAmount,
        timestamp: new Date().toISOString(),
      });
      assetsToReinvest.push(reinvestAmount);
      return false;
    }

    return true;
  });

  // Reinvest using amounts from sold assets
  assetsToReinvest.forEach((amount) => {
    const newAsset = allAssets.find(
      (a) => !stakeState.investedAssets.find((b) => b.symbol === a.symbol)
    );

    if (newAsset) {
      const newAmount = amount / newAsset.price;
      stakeState.investedAssets.push({
        ...newAsset,
        purchasePrice: newAsset.price,
        amount: newAmount,
      });
      stakeState.balance -= amount;
      stakeState.tradeHistory.push({
        type: "REINVEST",
        symbol: newAsset.symbol,
        amount: newAmount,
        price: newAsset.price,
        timestamp: new Date().toISOString(),
      });
    }
  });

  saveHistory();
}

export function getStakeState() {
  return stakeState;
}

export function getTradeHistory() {
  loadHistory();
  return stakeState.tradeHistory;
}
