'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { FiCloud, FiTarget, FiGift, FiCreditCard, FiActivity, FiRefreshCw, FiZap, FiBarChart2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function CO2WalletPage() {
  const [walletData, setWalletData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [redemptionOptions, setRedemptionOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRedemption, setSelectedRedemption] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [activeTab, setActiveTab] = useState('actions');

  // Mock data - will be replaced with MongoDB data later
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockWallet = {
        totalCO2: 12560, // in kg
        totalTokens: 8560,
        equivalent: "12.5 tons",
        impact: "Equivalent to 500 trees planted",
        level: "Eco Champion",
        progress: 75,
        nextLevel: "Earth Guardian",
        nextLevelTokens: 2000,
        lastMonthCO2: 3450
      };
      
      const mockTransactions = [
        { id: 1, type: 'waste_sale', action: 'Sold Rice Straw', co2: 850, tokens: 600, date: '2023-12-15', status: 'completed' },
        { id: 2, type: 'waste_sale', action: 'Sold Wheat Straw', co2: 650, tokens: 450, date: '2023-12-10', status: 'completed' },
        { id: 3, type: 'energy_saving', action: 'Solar Energy Usage', co2: 1200, tokens: 850, date: '2023-12-05', status: 'completed' },
        { id: 4, type: 'recycling', action: 'Composted Organic Waste', co2: 420, tokens: 300, date: '2023-11-28', status: 'completed' },
        { id: 5, type: 'transport', action: 'Used Electric Vehicle', co2: 780, tokens: 550, date: '2023-11-22', status: 'completed' },
        { id: 6, type: 'renewable', action: 'Installed Rainwater Harvesting', co2: 1500, tokens: 1050, date: '2023-11-15', status: 'completed' },
        { id: 7, type: 'waste_sale', action: 'Sold Sugarcane Bagasse', co2: 2100, tokens: 1470, date: '2023-11-10', status: 'pending' },
      ];
      
      const mockRedemption = [
        { id: 1, name: "Farm Equipment Discount", description: "15% off on eco-friendly farming tools", tokens: 1500, category: "farming" },
        { id: 2, name: "Solar Panel Voucher", description: "₹5000 off on solar panel installation", tokens: 3000, category: "energy" },
        { id: 3, name: "Organic Seeds Package", description: "Free package of organic seeds", tokens: 800, category: "farming" },
        { id: 4, name: "Eco Workshop Pass", description: "Free pass to sustainable farming workshop", tokens: 1200, category: "education" },
        { id: 5, name: "Tree Adoption Certificate", description: "Adopt a tree in your name", tokens: 500, category: "environment" },
        { id: 6, name: "Electric Vehicle Charger", description: "30% off on home EV charger", tokens: 2500, category: "transport" },
      ];
      
      setWalletData(mockWallet);
      setTransactions(mockTransactions);
      setRedemptionOptions(mockRedemption);
      setLoading(false);
    }, 1500);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getActionIcon = (type) => {
    switch (type) {
      case 'waste_sale':
        return <FiActivity className="text-green-500" />;
      case 'energy_saving':
        return <FiZap className="text-yellow-500" />;
      case 'recycling':
        return <FiRefreshCw className="text-blue-500" />;
      case 'transport':
        return <FiBarChart2 className="text-purple-500" />;
      case 'renewable':
        return <FiCloud className="text-teal-500" />;
      default:
        return <FiTarget className="text-green-500" />;
    }
  };

  const redeemTokens = (option) => {
    setSelectedRedemption(option);
    setShowConfirmation(true);
  };

  const confirmRedemption = () => {
    // In a real app, this would connect to your backend
    setShowConfirmation(false);
    alert(`Success! You've redeemed: ${selectedRedemption.name}`);
    setSelectedRedemption(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-green-50">
      <Head>
        <title>AgriLink | CO2 Credit Wallet</title>
      </Head>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full bg-teal-200 opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-emerald-200 opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 rounded-full bg-green-200 opacity-20 animate-blob"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-green-800 bg-opacity-90 backdrop-blur-md sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <svg className="h-8 w-8 text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="ml-2 text-xl font-bold text-white">AgriLink</span>
              </div>
            </div>
            
            {/* Navigation Tabs */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <a href="#" className="px-1 py-2 border-b-2 border-transparent text-sm font-medium text-green-200 hover:text-white hover:border-green-300 transition-colors duration-300">
                  App
                </a>
                <a href="#" className="px-1 py-2 border-b-2 border-transparent text-sm font-medium text-green-200 hover:text-white hover:border-green-300 transition-colors duration-300">
                  Marketplace
                </a>
                <a href="#" className="px-1 py-2 border-b-2 border-transparent text-sm font-medium text-green-200 hover:text-white hover:border-green-300 transition-colors duration-300">
                  Portfolio
                </a>
                <a href="#" className="px-1 py-2 border-b-2 border-green-500 text-sm font-medium text-white">
                  CO2 Saved
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-green-200">Welcome, Farmer</span>
              <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                <span className="text-sm font-medium text-white">F</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-teal-700 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Your Carbon Credit Wallet
              </h1>
              <p className="text-xl text-teal-100 max-w-2xl">
                Track, manage, and redeem the CO2 credits you've earned through sustainable farming practices.
              </p>
              
              {!loading && walletData && (
                <div className="grid grid-cols-2 gap-4 pt-4 max-w-md">
                  <div className="bg-teal-600 p-4 rounded-xl">
                    <div className="flex items-center">
                      <FiTarget className="text-2xl mr-2" />
                      <span className="text-sm">CO2 Saved</span>
                    </div>
                    <p className="text-2xl font-bold mt-2">{walletData.totalCO2} kg</p>
                    <p className="text-xs opacity-80 mt-1">{walletData.equivalent}</p>
                  </div>
                  
                  <div className="bg-emerald-600 p-4 rounded-xl">
                    <div className="flex items-center">
                      <FiCreditCard className="text-2xl mr-2" />
                      <span className="text-sm">Tokens</span>
                    </div>
                    <p className="text-2xl font-bold mt-2">{walletData.totalTokens}</p>
                    <p className="text-xs opacity-80 mt-1">Available for redemption</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -top-8 -left-8 w-64 h-64 bg-teal-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-emerald-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="relative bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-teal-300 border-opacity-30 shadow-xl">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center bg-teal-600 rounded-full p-4 mb-4">
                      <FiTarget className="text-white text-3xl" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Your Impact</h3>
                    <p className="text-teal-200 mb-6">{walletData?.impact}</p>
                    
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Current Level: {walletData?.level}</span>
                        <span>Progress: {walletData?.progress}%</span>
                      </div>
                      <div className="w-full bg-teal-900 rounded-full h-4">
                        <motion.div 
                          className="bg-teal-500 h-4 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${walletData?.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        ></motion.div>
                      </div>
                      <div className="text-right text-xs mt-1">
                        Next: {walletData?.nextLevel} at {walletData?.nextLevelTokens} tokens
                      </div>
                    </div>
                    
                    <div className="bg-teal-800 rounded-lg p-4">
                      <p className="text-sm">Last month you saved</p>
                      <p className="text-xl font-bold">{walletData?.lastMonthCO2} kg CO2</p>
                      <p className="text-xs opacity-80 mt-1">Keep up the great work!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards - Mobile View */}
        {!loading && walletData && (
          <div className="md:hidden grid grid-cols-2 gap-4 mb-8">
            <div className="bg-teal-600 text-white p-4 rounded-xl">
              <div className="flex items-center">
                <FiTarget className="text-xl mr-2" />
                <span className="text-sm">CO2 Saved</span>
              </div>
              <p className="text-xl font-bold mt-2">{walletData.totalCO2} kg</p>
            </div>
            
            <div className="bg-emerald-600 text-white p-4 rounded-xl">
              <div className="flex items-center">
                <FiCreditCard className="text-xl mr-2" />
                <span className="text-sm">Tokens</span>
              </div>
              <p className="text-xl font-bold mt-2">{walletData.totalTokens}</p>
            </div>
            
            <div className="bg-teal-700 text-white p-4 rounded-xl col-span-2">
              <div className="flex items-center justify-between mb-2">
                <span>Current Level: {walletData.level}</span>
                <span>Progress: {walletData.progress}%</span>
              </div>
              <div className="w-full bg-teal-900 rounded-full h-3">
                <motion.div 
                  className="bg-teal-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${walletData.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                ></motion.div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-1 mb-8">
          <div className="flex">
            <button
              className={`flex-1 py-4 text-center font-medium transition-colors duration-300 rounded-lg ${
                activeTab === 'actions' 
                  ? 'bg-teal-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('actions')}
            >
              CO2 Saving Actions
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium transition-colors duration-300 rounded-lg ${
                activeTab === 'redeem' 
                  ? 'bg-teal-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('redeem')}
            >
              Redeem Tokens
            </button>
          </div>
        </div>

        {/* CO2 Saving Actions */}
        {activeTab === 'actions' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-teal-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                      CO2 Saved
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Tokens Earned
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <div className="flex justify-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                        </div>
                      </td>
                    </tr>
                  ) : transactions.length > 0 ? (
                    transactions.map((tx) => (
                      <tr 
                        key={tx.id} 
                        className="hover:bg-teal-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center">
                              {getActionIcon(tx.type)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{tx.action}</div>
                              <div className="text-sm text-gray-500">{tx.type.replace('_', ' ')}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-teal-600">
                          {tx.co2} kg
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 font-bold">
                          +{tx.tokens}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          {formatDate(tx.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          {tx.status === 'completed' 
                            ? <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Completed</span>
                            : <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Pending</span>}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mb-4">
                            <FiLeaf className="text-gray-400 text-2xl" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900">No CO2 actions yet</h3>
                          <p className="mt-1 text-gray-500">Your sustainable actions will appear here</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Redeem Tokens */}
        {activeTab === 'redeem' && (
          <div>
            <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Available Redemptions</h2>
              <p className="text-gray-600 mb-6">Redeem your tokens for valuable rewards and discounts</p>
              
              {!loading && walletData && (
                <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-lg mb-6">
                  <div className="flex items-center">
                    <FiCreditCard className="text-teal-500 text-xl mr-3" />
                    <div>
                      <p className="font-medium">Your Token Balance</p>
                      <p className="text-2xl font-bold text-teal-700">{walletData.totalTokens} tokens</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {redemptionOptions.map(option => (
                  <motion.div 
                    key={option.id}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    whileHover={{ y: -5 }}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{option.name}</h3>
                          <p className="text-gray-600 mt-1">{option.description}</p>
                        </div>
                        <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-bold">
                          {option.tokens} tokens
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <button
                          onClick={() => redeemTokens(option)}
                          className="w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center"
                        >
                          <FiGift className="mr-2" />
                          Redeem Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">How CO2 Credits Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="text-teal-600 text-3xl mb-4">1</div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Earn Credits</h3>
                  <p className="text-gray-600">
                    Perform sustainable actions like selling agricultural waste, using renewable energy, or eco-friendly farming.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="text-teal-600 text-3xl mb-4">2</div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Accumulate Tokens</h3>
                  <p className="text-gray-600">
                    Each action converts CO2 savings into tokens stored in your digital wallet.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="text-teal-600 text-3xl mb-4">3</div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Redeem Rewards</h3>
                  <p className="text-gray-600">
                    Exchange tokens for discounts, products, or services in our marketplace.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CO2 Impact Visualization */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Your Environmental Impact</h2>
            <div className="text-sm text-gray-500">Last 6 months</div>
          </div>
          
          <div className="h-64 flex items-end justify-center space-x-2 pb-6">
            {[65, 80, 120, 180, 210, 240].map((height, index) => (
              <motion.div 
                key={index} 
                className="relative flex flex-col items-center w-12"
                initial={{ height: 0 }}
                animate={{ height: `${height}px` }}
                transition={{ duration: 1, delay: index * 0.1 }}
              >
                <div 
                  className="w-full bg-gradient-to-t from-teal-500 to-emerald-400 rounded-t-lg"
                />
                <div className="mt-2 text-xs text-gray-500">{['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-teal-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Equivalent Trees Planted</p>
              <p className="text-lg font-bold">500+</p>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Cars Off the Road</p>
              <p className="text-lg font-bold">8</p>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Household Energy</p>
              <p className="text-lg font-bold">12 months</p>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Water Saved</p>
              <p className="text-lg font-bold">120,000 L</p>
            </div>
          </div>
        </div>
      </main>

      {/* Redemption Confirmation Modal */}
      {showConfirmation && selectedRedemption && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 mb-4">
                <FiGift className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Confirm Redemption</h3>
              <p className="text-gray-600 mb-6">
                You are about to redeem <span className="font-bold">{selectedRedemption.tokens} tokens</span> for:
              </p>
              
              <div className="bg-teal-50 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-lg">{selectedRedemption.name}</h4>
                <p className="text-gray-600">{selectedRedemption.description}</p>
              </div>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRedemption}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Confirm Redemption
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-green-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <svg className="h-8 w-8 text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="ml-2 text-xl font-bold">AgriLink</span>
              </div>
              <p className="mt-4 text-green-200">
                Building a sustainable future through agricultural innovation.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-green-200">
                <li><a href="#" className="hover:text-white transition-colors">Carbon Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sustainability Tips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rewards Program</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-green-200">
                <li><a href="#" className="hover:text-white transition-colors">CO2 Impact Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Token System</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Farming Sustainability</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Support</h3>
              <p className="text-green-200 mb-4">
                Have questions about your CO2 credits? Contact our sustainability team.
              </p>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Get Help
              </button>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-green-800 text-center text-green-300">
            <p>© 2023 AgriLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}