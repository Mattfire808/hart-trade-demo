import React, { useState, useEffect } from "react";
import {
  initializeAutoStake,
  runAutoStakeCycle,
  getStakeState,
} from "../utils/autoStakeEngine";

const useAutoStakeRunner = (isRunning, interval = 10000) => {
  useEffect(() => {
    if (!isRunning) return;

    const execute = () => runAutoStakeCycle();
    const id = setInterval(execute, interval);
    return () => clearInterval(id);
  }, [isRunning, interval]);
};

const Trade = () => {
  const [formData, setFormData] = useState({
    initialInvestment: 1000,
    assetType: "crypto",
    numberOfAssets: 3,
    duration: 7,
    cashOutPercent: 100,
    autoSellGain: 10,
    autoSellLoss: 3,
    percentagePerAsset: 10,
  });

  const [isRunning, setIsRunning] = useState(false);
  const [stakeSnapshot, setStakeSnapshot] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("number") || name.includes("Percent")
        ? parseFloat(value)
        : value,
    }));
  };

  const handleStart = () => {
    initializeAutoStake(formData);
    setIsRunning(true);
  };

  useAutoStakeRunner(isRunning, 10000);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setStakeSnapshot({ ...getStakeState() });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const stakeState = getStakeState();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Auto Stake Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded shadow">
        <label>
          💷 Initial Investment (£)
          <input
            type="number"
            name="initialInvestment"
            value={formData.initialInvestment}
            onChange={handleInputChange}
            className="w-full mt-1 border rounded p-2"
          />
        </label>
        <label>
          🗂️ Asset Type
          <select
            name="assetType"
            value={formData.assetType}
            onChange={handleInputChange}
            className="w-full mt-1 border rounded p-2"
          >
            <option value="crypto">Crypto</option>
            <option value="stocks">Stocks</option>
            <option value="both">Both</option>
          </select>
        </label>
        <label>
          🔢 Number of Assets
          <input
            type="number"
            name="numberOfAssets"
            value={formData.numberOfAssets}
            onChange={handleInputChange}
            className="w-full mt-1 border rounded p-2"
          />
        </label>
        <label>
          🕒 Duration (days)
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className="w-full mt-1 border rounded p-2"
          />
        </label>
        <label>
          💸 Cash Out at % of Stake
          <input
            type="number"
            name="cashOutPercent"
            value={formData.cashOutPercent}
            onChange={handleInputChange}
            className="w-full mt-1 border rounded p-2"
          />
        </label>
        <label>
          📈 Auto-Sell Gain Threshold (%)
          <input
            type="number"
            name="autoSellGain"
            value={formData.autoSellGain}
            onChange={handleInputChange}
            className="w-full mt-1 border rounded p-2"
          />
        </label>
        <label>
          📉 Auto-Sell Loss Threshold (%)
          <input
            type="number"
            name="autoSellLoss"
            value={formData.autoSellLoss}
            onChange={handleInputChange}
            className="w-full mt-1 border rounded p-2"
          />
        </label>
        <label>
          🧮 % Stake per Asset
          <input
            type="number"
            name="percentagePerAsset"
            value={formData.percentagePerAsset}
            onChange={handleInputChange}
            className="w-full mt-1 border rounded p-2"
          />
        </label>
      </div>

      <button
        onClick={handleStart}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Start Auto Stake
      </button>

      {stakeSnapshot && (
        <div className="mt-8 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Auto Stake Summary</h2>
          <p>💼 Mock Balance: £{stakeSnapshot.balance.toFixed(2)}</p>
          <p>🏦 Banked Profit: £{stakeSnapshot.bankedProfit.toFixed(2)}</p>
          <p className="mt-2 font-medium">📈 Active Assets:</p>
          <ul className="list-disc ml-6">
            {stakeSnapshot.investedAssets.map((asset, idx) => (
              <li key={idx}>
                {asset.symbol} — {asset.amount.toFixed(4)} units @ £
                {asset.purchasePrice}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">📊 Auto Stake Live Status</h2>
        <p>
          <strong>Balance:</strong> £{stakeState.balance.toFixed(2)}
        </p>
        <p>
          <strong>Banked Profit:</strong> £{stakeState.bankedProfit.toFixed(2)}
        </p>
        <p>
          <strong>Active Assets:</strong> {stakeState.investedAssets.length}
        </p>
      </div>
    </div>
  );
};

export default Trade;
