// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// import ExpenseForm from '../components/ExpenseForm';
// import { useNavigate } from 'react-router-dom';
// import ScanReceiptCard from '../components/ScanReceiptCard';


// const Dashboard = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [view, setView] = useState('monthly');
//   const token = localStorage.getItem('token');
//   const userName = localStorage.getItem('userName');

//   const navigate = useNavigate();

//   const fetchExpenses = useCallback(async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/expenses', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setExpenses(res.data);
//     } catch (err) {
//       alert('Error fetching expenses');
//     } finally {
//       setLoading(false);
//     }
//   }, [token]);

//   useEffect(() => {
//     fetchExpenses();
//   }, [fetchExpenses]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   const now = new Date();
//   const filteredExpenses = expenses.filter((expense) => {
//     const expDate = new Date(expense.date);
//     const diffInDays = (now - expDate) / (1000 * 60 * 60 * 24);

//     if (view === 'daily') return diffInDays < 1;
//     if (view === 'weekly') return diffInDays <= 7;
//     if (view === 'monthly')
//       return (
//         now.getMonth() === expDate.getMonth() &&
//         now.getFullYear() === expDate.getFullYear()
//       );
//     return true;
//   });

//   const totalAmount = filteredExpenses.reduce((acc, exp) => acc + exp.amount, 0);
//   const categoryTotals = filteredExpenses.reduce((totals, exp) => {
//     totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
//     return totals;
//   }, {});

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-8 transition-all">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-bold text-gray-800">Welcome, {userName || 'User'} 👋</h2>
//           <h2 className="text-3xl font-bold text-gray-800">Track Your Spending</h2>
//           <button
//             onClick={handleLogout}
//             className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Toggle Buttons */}
//         <div className="flex gap-3 mb-6">
//           {['daily', 'weekly', 'monthly'].map((v) => (
//             <button
//               key={v}
//               onClick={() => setView(v)}
//               className={`px-4 py-1.5 rounded-full text-sm capitalize transition ${
//                 view === v
//                   ? 'bg-purple-500 text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
//               }`}
//             >
//               {v}
//             </button>
//           ))}
//         </div>

//         {loading ? (
//           <p className="text-gray-500 text-center">Loading expenses...</p>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div className="bg-purple-50 p-4 rounded-lg shadow-sm">
//                 <h3 className="text-md font-semibold text-gray-700 mb-1">
//                   Total {view.charAt(0).toUpperCase() + view.slice(1)} Expenses
//                 </h3>
//                 <p className="text-3xl text-purple-600 font-bold">₹{totalAmount}</p>
//               </div>

//               <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
//                 <h4 className="text-md font-semibold text-gray-700 mb-1">
//                   Expenses by Category
//                 </h4>
//                 <ul className="text-sm text-gray-700 list-disc list-inside">
//                   {Object.entries(categoryTotals).map(([category, amount]) => (
//                     <li key={category}>
//                       <span className="font-medium">{category}:</span> ₹{amount}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             <hr className="my-4" />
//             <ScanReceiptCard
//             onExtractedData={(data) =>
//                 setTimeout(() => {
//                 document.dispatchEvent(
//                     new CustomEvent('fillExpenseForm', { detail: data })
//                 );
//                 }, 100)
//             }
//             />

//             <ExpenseForm onAdd={fetchExpenses} />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ExpenseForm from '../components/ExpenseForm';
import { useNavigate } from 'react-router-dom';
import ScanReceiptCard from '../components/ScanReceiptCard';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('monthly');
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const navigate = useNavigate();

  const fetchExpenses = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/expenses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data);
    } catch (err) {
      alert('Error fetching expenses');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const now = new Date();
  const filteredExpenses = expenses.filter((expense) => {
    const expDate = new Date(expense.date);
    const diffInDays = (now - expDate) / (1000 * 60 * 60 * 24);

    if (view === 'daily') return diffInDays < 1;
    if (view === 'weekly') return diffInDays <= 7;
    if (view === 'monthly')
      return (
        now.getMonth() === expDate.getMonth() &&
        now.getFullYear() === expDate.getFullYear()
      );
    return true;
  });

  // ✅ Compute totals here
  const totalAmount = filteredExpenses.reduce((acc, exp) => acc + exp.amount, 0);
  const categoryTotals = filteredExpenses.reduce((totals, exp) => {
    totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
    return totals;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-8 transition-all">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">
              Welcome, {userName || 'User'} 👋
            </h2>
            <h2 className="text-3xl font-bold text-gray-800">Track Your Spending</h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/profile')}
              className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Toggle Buttons */}
        <div className="flex gap-3 mb-6">
          {['daily', 'weekly', 'monthly'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1.5 rounded-full text-sm capitalize transition ${
                view === v
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-500 text-center">Loading expenses...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-purple-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-md font-semibold text-gray-700 mb-1">
                  Total {view.charAt(0).toUpperCase() + view.slice(1)} Expenses
                </h3>
                <p className="text-3xl text-purple-600 font-bold">₹{totalAmount}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <h4 className="text-md font-semibold text-gray-700 mb-1">
                  Expenses by Category
                </h4>
                <ul className="text-sm text-gray-700 list-disc list-inside">
                  {Object.entries(categoryTotals).map(([category, amount]) => (
                    <li key={category}>
                      <span className="font-medium">{category}:</span> ₹{amount}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <hr className="my-4" />
            <ScanReceiptCard
              onExtractedData={(data) =>
                setTimeout(() => {
                  document.dispatchEvent(
                    new CustomEvent('fillExpenseForm', { detail: data })
                  );
                }, 100)
              }
            />

            <ExpenseForm onAdd={fetchExpenses} />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
