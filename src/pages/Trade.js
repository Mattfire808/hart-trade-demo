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
