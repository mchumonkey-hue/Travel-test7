import React, { useState, useMemo } from 'react';
import { Expense } from '../types';

interface ExpenseTrackerProps {
  expenses: Expense[];
  onAddExpense: (expense: Expense) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const EXCHANGE_RATE = 0.9; // 1 THB approx 0.9 TWD (simplified)

const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({ expenses, onAddExpense, isOpen, setIsOpen }) => {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<'THB' | 'TWD'>('THB');
  const [paidBy, setPaidBy] = useState<'A' | 'B'>('A');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item || !amount) return;

    onAddExpense({
      id: Date.now().toString(),
      item,
      amount: parseFloat(amount),
      currency,
      paidBy,
      timestamp: Date.now()
    });

    setItem('');
    setAmount('');
  };

  const totals = useMemo(() => {
    let totalPaidA_inTHB = 0;
    let totalPaidB_inTHB = 0;

    expenses.forEach(exp => {
      const amountInTHB = exp.currency === 'THB' ? exp.amount : exp.amount / EXCHANGE_RATE;
      if (exp.paidBy === 'A') totalPaidA_inTHB += amountInTHB;
      else totalPaidB_inTHB += amountInTHB;
    });

    const grandTotal = totalPaidA_inTHB + totalPaidB_inTHB;
    const sharePerPerson = grandTotal / 2;
    
    // Logic: If A paid 1000, B paid 0. Share is 500. B owes A 500.
    // If A paid 1000 (total), A needs to have "consumed" 500. A paid 500 extra.
    const aBalance = totalPaidA_inTHB - sharePerPerson; // Positive means A is owed money
    
    return {
      total: grandTotal,
      aPaid: totalPaidA_inTHB,
      bPaid: totalPaidB_inTHB,
      settlement: aBalance // if > 0, B pays A. if < 0, A pays B.
    };
  }, [expenses]);

  if (!isOpen) {
      return (
          <button 
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 bg-amber-600 text-white p-4 rounded-full shadow-lg z-40 hover:bg-amber-700 transition-transform active:scale-95 flex items-center justify-center"
            aria-label="Open Expense Tracker"
          >
             <span className="text-2xl">฿</span>
          </button>
      )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto"
        onClick={() => setIsOpen(false)}
      ></div>
      
      <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl pointer-events-auto max-h-[85vh] flex flex-col animate-slide-up">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-bold text-amber-900">Trip Expenses</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Summary Card */}
        <div className="bg-amber-50 rounded-lg p-4 mb-4 border border-amber-200 text-sm">
            <div className="flex justify-between mb-1">
                <span>Total Spent:</span>
                <span className="font-bold">{totals.total.toFixed(0)} THB</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600 mb-2">
                <span>(Approx { (totals.total * EXCHANGE_RATE).toFixed(0) } TWD)</span>
            </div>
            <div className="border-t border-amber-200 my-2"></div>
            <div className="text-center font-bold text-lg text-amber-800">
                {totals.settlement > 0 
                  ? `Person B pays A: ${totals.settlement.toFixed(0)} THB`
                  : totals.settlement < 0
                  ? `Person A pays B: ${Math.abs(totals.settlement).toFixed(0)} THB`
                  : "All settled!"}
            </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-2 pr-1">
          {expenses.length === 0 && <p className="text-center text-gray-400 py-4">No expenses recorded.</p>}
          {expenses.slice().reverse().map(exp => (
            <div key={exp.id} className="flex justify-between items-center bg-gray-50 p-2 rounded border border-gray-100">
              <div>
                <div className="font-medium text-gray-800">{exp.item}</div>
                <div className="text-xs text-gray-500">Paid by {exp.paidBy === 'A' ? 'Person A' : 'Person B'}</div>
              </div>
              <div className="font-bold text-amber-700">
                {exp.amount} {exp.currency}
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white pt-2">
            <div className="grid grid-cols-2 gap-2 mb-2">
                <input 
                    type="text" 
                    placeholder="Item (e.g. Taxi)" 
                    className="col-span-2 border border-gray-300 rounded p-2 focus:outline-none focus:border-amber-500"
                    value={item}
                    onChange={e => setItem(e.target.value)}
                />
                <input 
                    type="number" 
                    placeholder="Amount" 
                    className="border border-gray-300 rounded p-2 focus:outline-none focus:border-amber-500"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                />
                <select 
                    className="border border-gray-300 rounded p-2 bg-white"
                    value={currency}
                    onChange={e => setCurrency(e.target.value as any)}
                >
                    <option value="THB">THB ฿</option>
                    <option value="TWD">TWD $</option>
                </select>
                <div className="col-span-2 flex space-x-2">
                    <span className="text-sm self-center text-gray-600">Paid by:</span>
                    <button type="button" onClick={() => setPaidBy('A')} className={`flex-1 py-1 rounded border ${paidBy === 'A' ? 'bg-amber-100 border-amber-500 text-amber-800' : 'bg-white border-gray-300'}`}>Person A</button>
                    <button type="button" onClick={() => setPaidBy('B')} className={`flex-1 py-1 rounded border ${paidBy === 'B' ? 'bg-amber-100 border-amber-500 text-amber-800' : 'bg-white border-gray-300'}`}>Person B</button>
                </div>
            </div>
            <button type="submit" className="w-full bg-amber-600 text-white py-3 rounded-lg font-bold hover:bg-amber-700 transition-colors">
                Add Expense
            </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseTracker;
