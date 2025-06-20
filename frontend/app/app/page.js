'use client'
import { useState, useRef } from 'react';
import Head from 'next/head';
import { FiUpload, FiCamera, FiInfo, FiCheckCircle, FiXCircle } from 'react-icons/fi';

export default function AppPage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    wasteType: '',
    quantity: '',
    quality: '',
    location: '',
    pickupPreference: '',
    additionalNotes: ''
  });
  const fileInputRef = useRef(null);
  const [step, setStep] = useState(1); // 1: upload, 2: form, 3: results

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      // Simulate ML classification
      setIsLoading(true);
      setTimeout(() => {
        const mockResults = {
          wasteType: getRandomWasteType(),
          confidence: (Math.random() * 0.5 + 0.5).toFixed(2), // 50-100% confidence
          quality: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
          estimatedValue: Math.floor(Math.random() * 5000) + 1000 // ₹1000-6000
        };
        setClassificationResult(mockResults);
        setFormData(prev => ({
          ...prev,
          wasteType: mockResults.wasteType,
          quality: mockResults.quality
        }));
        setIsLoading(false);
        setStep(2); // Move to form step
      }, 1500);
    }
  };

  const getRandomWasteType = () => {
    const types = [
      'Rice Straw',
      'Wheat Straw',
      'Sugarcane Bagasse',
      'Corn Stalks',
      'Cotton Stalks',
      'Coconut Husks',
      'Banana Plant Waste',
      'Groundnut Shells',
      'Mustard Stalks',
      'Paddy Husk'
    ];
    return types[Math.floor(Math.random() * types.length)];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(3); // Move to results step
    }, 1000);
  };

  const resetProcess = () => {
    setImage(null);
    setPreview(null);
    setClassificationResult(null);
    setFormData({
      wasteType: '',
      quantity: '',
      quality: '',
      location: '',
      pickupPreference: '',
      additionalNotes: ''
    });
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>AgriLink | Waste Upload</title>
      </Head>

      {/* Navigation */}
      <nav className="bg-green-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <svg className="h-8 w-8 text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="ml-2 text-xl font-bold">AgriLink</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-green-200">Welcome, Farmer</span>
              <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                <span className="text-sm font-medium">F</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Progress Steps */}
          <div className="border-b border-gray-200">
            <div className="flex justify-between px-8 py-4">
              <div className={`flex flex-col items-center ${step >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-green-100 border-2 border-green-600' : 'bg-gray-100 border-2 border-gray-300'}`}>
                  {step > 1 ? (
                    <FiCheckCircle className="h-5 w-5" />
                  ) : (
                    <span>1</span>
                  )}
                </div>
                <span className="mt-2 text-sm font-medium">Upload Waste</span>
              </div>
              <div className={`flex flex-col items-center ${step >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-green-100 border-2 border-green-600' : 'bg-gray-100 border-2 border-gray-300'}`}>
                  {step > 2 ? (
                    <FiCheckCircle className="h-5 w-5" />
                  ) : (
                    <span>2</span>
                  )}
                </div>
                <span className="mt-2 text-sm font-medium">Details</span>
              </div>
              <div className={`flex flex-col items-center ${step >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-green-100 border-2 border-green-600' : 'bg-gray-100 border-2 border-gray-300'}`}>
                  <span>3</span>
                </div>
                <span className="mt-2 text-sm font-medium">Results</span>
              </div>
            </div>
          </div>

          {/* Step 1: Image Upload */}
          {step === 1 && (
            <div className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">Upload Agricultural Waste</h2>
                <p className="mt-2 text-gray-600">
                  Take a photo or upload an image of your agricultural waste for AI classification
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center">
                {preview ? (
                  <div className="relative">
                    <img 
                      src={preview} 
                      alt="Waste preview" 
                      className="h-64 w-full object-cover rounded-lg border-2 border-dashed border-green-300"
                    />
                    {isLoading && (
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div 
                    className="h-64 w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-400 transition-colors"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <FiUpload className="h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">JPG, PNG up to 5MB</p>
                  </div>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />

                <div className="mt-6">
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FiCamera className="mr-2" />
                    {preview ? 'Take Another Photo' : 'Take Photo'}
                  </button>
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FiInfo className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      For best results: Take clear photos in daylight, showing the waste pile from multiple angles if possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Waste Details Form */}
          {step === 2 && (
            <div className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">Waste Details</h2>
                <p className="mt-2 text-gray-600">
                  Review the AI classification and provide additional details about your waste
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Left Column - AI Results */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">AI Classification Results</h3>
                  
                  {classificationResult && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Waste Type</label>
                        <p className="mt-1 text-gray-900 font-medium">
                          {classificationResult.wasteType}
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            {classificationResult.confidence * 100}% confidence
                          </span>
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Quality Assessment</label>
                        <p className="mt-1 text-gray-900 font-medium">
                          {classificationResult.quality}
                          {classificationResult.quality === 'High' && (
                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Premium Value
                            </span>
                          )}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Estimated Value</label>
                        <p className="mt-1 text-gray-900 font-medium">
                          ₹{classificationResult.estimatedValue} per ton
                        </p>
                      </div>
                      <div className="pt-4 border-t border-gray-200">
                        <button 
                          onClick={() => setStep(1)}
                          className="text-sm text-green-600 hover:text-green-800 font-medium"
                        >
                          Re-upload image
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="wasteType" className="block text-sm font-medium text-gray-700">
                      Waste Type
                    </label>
                    <select
                      id="wasteType"
                      name="wasteType"
                      value={formData.wasteType}
                      onChange={handleInputChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                      required
                    >
                      <option value="">Select waste type</option>
                      <option value="Rice Straw">Rice Straw</option>
                      <option value="Wheat Straw">Wheat Straw</option>
                      <option value="Sugarcane Bagasse">Sugarcane Bagasse</option>
                      <option value="Corn Stalks">Corn Stalks</option>
                      <option value="Cotton Stalks">Cotton Stalks</option>
                      <option value="Coconut Husks">Coconut Husks</option>
                      <option value="Banana Plant Waste">Banana Plant Waste</option>
                      <option value="Groundnut Shells">Groundnut Shells</option>
                      <option value="Mustard Stalks">Mustard Stalks</option>
                      <option value="Paddy Husk">Paddy Husk</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                      Quantity (in tons)
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="0.1"
                      step="0.1"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                      placeholder="e.g. 2.5"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="quality" className="block text-sm font-medium text-gray-700">
                      Quality
                    </label>
                    <select
                      id="quality"
                      name="quality"
                      value={formData.quality}
                      onChange={handleInputChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                      required
                    >
                      <option value="">Select quality</option>
                      <option value="Low">Low (Mixed with soil/other materials)</option>
                      <option value="Medium">Medium (Some impurities)</option>
                      <option value="High">High (Clean and well-separated)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location (Nearest Landmark)
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                      placeholder="e.g. Near Krishi Farm, Pune Highway"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="pickupPreference" className="block text-sm font-medium text-gray-700">
                      Pickup Preference
                    </label>
                    <select
                      id="pickupPreference"
                      name="pickupPreference"
                      value={formData.pickupPreference}
                      onChange={handleInputChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                      required
                    >
                      <option value="">Select pickup option</option>
                      <option value="Self Transport">I can transport to nearby collection center</option>
                      <option value="Need Pickup">Need pickup from my farm</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700">
                      Additional Notes
                    </label>
                    <textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      rows={3}
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
                      placeholder="Any special instructions or details about the waste..."
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Processing...' : 'Submit Waste Listing'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Step 3: Results */}
          {step === 3 && (
            <div className="p-8">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <FiCheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="mt-3 text-2xl font-bold text-gray-800">Waste Successfully Listed!</h2>
                <p className="mt-2 text-gray-600">
                  Your agricultural waste is now visible to our network of buyers.
                </p>
              </div>

              <div className="mt-8 bg-green-50 rounded-lg overflow-hidden shadow">
                <div className="px-6 py-5 border-b border-green-200 bg-green-100">
                  <h3 className="text-lg font-medium text-green-800">Listing Summary</h3>
                </div>
                <div className="px-6 py-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Waste Type</p>
                    <p className="mt-1 text-sm text-gray-900">{formData.wasteType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Quantity</p>
                    <p className="mt-1 text-sm text-gray-900">{formData.quantity} tons</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Quality</p>
                    <p className="mt-1 text-sm text-gray-900">{formData.quality}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="mt-1 text-sm text-gray-900">{formData.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Estimated Value</p>
                    <p className="mt-1 text-sm text-gray-900">
                      ₹{Math.round(classificationResult.estimatedValue * parseFloat(formData.quantity || 1))} 
                      <span className="text-gray-500"> (₹{classificationResult.estimatedValue}/ton)</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pickup Preference</p>
                    <p className="mt-1 text-sm text-gray-900">{formData.pickupPreference}</p>
                  </div>
                  {formData.additionalNotes && (
                    <div className="sm:col-span-2">
                      <p className="text-sm font-medium text-gray-500">Additional Notes</p>
                      <p className="mt-1 text-sm text-gray-900">{formData.additionalNotes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">What Happens Next?</h3>
                <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    <li className="p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600">1</span>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">Buyers Review Your Listing</p>
                          <p className="text-sm text-gray-500">
                            Our verified industrial buyers will review your waste listing and may submit offers.
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600">2</span>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">Receive Offers</p>
                          <p className="text-sm text-gray-500">
                            You'll receive notifications when buyers make offers. Compare prices and terms.
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600">3</span>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">Finalize Transaction</p>
                          <p className="text-sm text-gray-500">
                            Accept the best offer, arrange logistics, and get paid upon delivery.
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex justify-center space-x-4">
                <button
                  onClick={resetProcess}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  List Another Waste
                </button>
                <button
                  onClick={() => {/* Navigate to dashboard */}}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  View Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}