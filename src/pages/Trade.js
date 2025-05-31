import useAutoStakeRunner from "../hooks/useAutoStakeRunner";
import { getStakeState } from "../utils/autoStakeEngine";

import React, { useState } from 'react';

const Trade = () => {
  const [mockBalance, setMockBalance] = useState(1000);
  const [stakeAmount, setStakeAmount] = useState('');
  const [stakeType, setStakeType] = useState('crypto');
  const [assetCount, setAssetCount] = useState(1);
  const [duration, setDuration] = useState('7');
  const [cashOutPercent, setCashOutPercent] = useState(100);
  const [profitTrigger, setProfitTrigger] = useState(10);
  const [lossTrigger, setLossTrigger] = useState(3);
  const [individualStakePercent, setIndividualStakePercent] = useState(10);

  const handleStartAutoStake = () => {
    const config = {
      stakeAmount,
      stakeType,
      assetCount,
      duration,
      cashOutPercent,
      profitTrigger,
      lossTrigger,
      individualStakePercent,
    };

    localStorage.setItem('autoStakeConfig', JSON.stringify(config));
    alert('Auto Stake configuration saved.');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Trade - Auto Stake</h1>

      <div className="mb-4">
        <label className="block mb-1">Mock Balance: £{mockBalance}</label>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Stake Amount (£)</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Stake Type</label>
        <select
          className="w-full p-2 border rounded"
          value={stakeType}
          onChange={(e) => setStakeType(e.target.value)}
        >
          <option value="crypto">Crypto</option>
          <option value="stocks">Stocks</option>
          <option value="both">Both</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Number of Assets to Stake In</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={assetCount}
          onChange={(e) => setAssetCount(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Stake Duration (days)</label>
        <select
          className="w-full p-2 border rounded"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <option value="1">1</option>
          <option value="7">7</option>
          <option value="30">30</option>
          <option value="90">90</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Cash Out % at End of Stake</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={cashOutPercent}
          onChange={(e) => setCashOutPercent(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1">Profit Trigger (%)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={profitTrigger}
            onChange={(e) => setProfitTrigger(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Loss Trigger (%)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={lossTrigger}
            onChange={(e) => setLossTrigger(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-1">Individual Stake % per Asset</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={individualStakePercent}
          onChange={(e) => setIndividualStakePercent(e.target.value)}
        />
      </div>

      <button
        onClick={handleStartAutoStake}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Start Auto Stake
      </button>
    </div>
  );
};

export default Trade;
import {
  initializeAutoStake,
  runAutoStakeCycle,
  getStakeState,
} from "../utils/autoStakeEngine";

const Trade = () => {
  const [formData, setFormData] = useState({
    initialInvestment: 1000,
    assetType: "crypto",
    numberOfAssets: 3,
    durationDays: 7,
    cashOutPercentage: 100,
    autoSellGain: 10,
    autoSellLoss: 3,
    percentagePerAsset: 10,
  });

  const [isRunning, setIsRunning] = useState(false);
  const [stakeSnapshot, setStakeSnapshot] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number.isNaN(Number(value)) ? value : Number(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    initializeAutoStake(formData);
    setIsRunning(true);
	initializeAutoStake(settings);
setIsRunning(true);

  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      runAutoStakeCycle();
      setStakeSnapshot({ ...getStakeState() });
    }, 5000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="p-6">
      {/* Existing form goes here */}

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
    </div>
  );
};
const [isRunning, setIsRunning] = useState(false);
useAutoStakeRunner(isRunning, 10000); // 10-second interval
<div className="mt-6 bg-white p-4 rounded shadow">
  <h2 className="text-xl font-bold mb-2">📊 Auto Stake Live Status</h2>
  <p><strong>Balance:</strong> £{getStakeState().balance.toFixed(2)}</p>
  <p><strong>Banked Profit:</strong> £{getStakeState().bankedProfit.toFixed(2)}</p>
  <p><strong>Active Assets:</strong> {getStakeState().investedAssets.length}</p>
</div>
export default Trade;
