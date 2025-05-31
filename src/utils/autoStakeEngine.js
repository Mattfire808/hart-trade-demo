// src/utils/autoStakeEngine.js

import { getMockPrices } from "../data/mockDataFeed";

let stakeSettings = null;
let stakeState = {
  investedAssets: [],
  bankedProfit: 0,
  balance: 0,
};

export function initializeAutoStake(settings) {
  stakeSettings = settings;
  stakeState.balance = settings.initialInvestment;
  stakeState.investedAssets = [];
  stakeState.bankedProfit = 0;
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
      stakeState.investedAssets.push({
        ...asset,
        purchasePrice: asset.price,
        amount: stakePerAsset / asset.price,
      });
      stakeState.balance -= stakePerAsset;
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
      return false; // remove asset
    }

    // Auto-sell and reinvest for loss
    if (change <= -stakeSettings.autoSellLoss / 100) {
      const reinvestAmount = asset.amount * livePrice;
      stakeState.balance += reinvestAmount;
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
      stakeState.investedAssets.push({
        ...newAsset,
        purchasePrice: newAsset.price,
        amount: amount / newAsset.price,
      });
      stakeState.balance -= amount;
    }
  });
}

export function getStakeState() {
  return stakeState;
}
