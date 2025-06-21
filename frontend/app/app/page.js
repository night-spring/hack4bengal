'use client'
import { useState, useRef } from 'react';
import Head from 'next/head';
import { FiUpload, FiCamera, FiInfo, FiCheckCircle, FiXCircle, FiEdit2 } from 'react-icons/fi';
import { uploadWasteInfo, uploadWasteImage } from "../actions/mongodbfunctions"
import { v4 as uuidv4 } from 'uuid';
import { uploadWasteData } from '../actions/mongodbfunctions';


export default function AppPage() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [classificationResult, setClassificationResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        cropType: '',
        wasteDescription: '',
        quantity: '',
        quantityUnit: 'kg',
        moistureLevel: '',
        ageOfWaste: '',
        location: '',
        intendedUse: '',
        additionalNotes: ''
    });
    const fileInputRef = useRef(null);
    const [step, setStep] = useState(1); // 1: upload, 2: form, 3: results
    const [inputMethod, setInputMethod] = useState('image'); // Added state for inputMethod
    const [description, setDescription] = useState(''); // Added state for description

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setIsLoading(true);

            try {
                // Mock AI classification
                const mockResults = {
                    cropType: getRandomCropType(),
                    confidence: (Math.random() * 0.5 + 0.5).toFixed(2),
                    moistureLevel: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
                    estimatedValue: Math.floor(Math.random() * 5000) + 1000
                };

                const finalFormData = {
                    ...formData,
                    cropType: mockResults.cropType,
                    moistureLevel: mockResults.moistureLevel,
                    estimatedValue: mockResults.estimatedValue,
                    confidence: mockResults.confidence
                };

                // Convert file to base64 for server action
                const base64Image = await convertFileToBase64(file);

                // Upload to MongoDB + Supabase
                const result = await uploadWasteData({
                    formData: finalFormData,
                    imageBase64: base64Image
                });

                setClassificationResult(mockResults);
                setFormData(finalFormData);
                setStep(2);
            } catch (err) {
                console.error("Upload failed:", err);
                alert("Something went wrong while uploading data. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Helper function to convert file to base64
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };
    const getRandomCropType = () => {
        const types = [
            'Rice',
            'Wheat',
            'Sugarcane'
        ];
        return types[Math.floor(Math.random() * types.length)];
    };

    const handleDescriptionSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            const mockResults = {
                cropType: getRandomCropType(),
                confidence: (Math.random() * 0.5 + 0.5).toFixed(2),
                moistureLevel: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
                estimatedValue: Math.floor(Math.random() * 5000) + 1000
            };
            setClassificationResult(mockResults);
            setFormData(prev => ({
                ...prev,
                cropType: mockResults.cropType,
                moistureLevel: mockResults.moistureLevel
            }));
            setIsLoading(false);
            setStep(2);
        }, 1500);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Convert image to base64 if it exists
            const imageBase64 = image ? await convertFileToBase64(image) : null;

            await uploadWasteInfo({
                classificationResult,
                formData,
                imageBase64
            });

            setStep(3);
        } catch (err) {
            console.error("Submission failed:", err);
            alert("Something went wrong while submitting. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    function handleFileChange(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setImage(url);
    }

    const resetProcess = () => {
        setImage(null);
        setPreview(null);
        setClassificationResult(null);
        setFormData({
            cropType: '',
            wasteDescription: '',
            quantity: '',
            quantityUnit: 'kg',
            moistureLevel: '',
            ageOfWaste: '',
            location: '',
            intendedUse: '',
            additionalNotes: ''
        });
        setDescription('');
        setInputMethod('image');
        setStep(1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-50">
            <Head>
                <title>AgriLink | Waste Upload</title>
            </Head>

            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden -z-10">
                <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full bg-green-200 opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-yellow-200 opacity-20 animate-blob animation-delay-4000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-40 h-40 rounded-full bg-orange-200 opacity-20 animate-blob"></div>
            </div>

            <nav className="bg-green-800 bg-opacity-90 backdrop-blur-md sticky top-0 z-50 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
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
                                <a href="/app" className="px-1 py-2 border-b-2 border-green-500 text-sm font-medium text-white">
                                    App
                                </a>
                                <a href="/marketplace" className="px-1 py-2 border-b-2 border-transparent text-sm font-medium text-green-200 hover:text-white hover:border-green-300 transition-colors duration-300">
                                    Marketplace
                                </a>
                                <a href="#" className="px-1 py-2 border-b-2 border-transparent text-sm font-medium text-green-200 hover:text-white hover:border-green-300 transition-colors duration-300">
                                    Portfolio
                                </a>
                                <a href="#" className="px-1 py-2 border-b-2 border-transparent text-sm font-medium text-green-200 hover:text-white hover:border-green-300 transition-colors duration-300">
                                    CO2 Saved
                                </a>
                            </div>
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:block">
                                <span className="text-green-200">Welcome, Farmer</span>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center cursor-pointer hover:bg-green-500 transition-colors duration-300">
                                <span className="text-sm font-medium text-white">F</span>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-green-200 hover:text-white hover:bg-green-700 focus:outline-none"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className="md:hidden hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-700 bg-opacity-90">
                        <a href="/app" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-green-800">
                            App
                        </a>
                        <a href="/marketplace" className="block px-3 py-2 rounded-md text-base font-medium text-green-200 hover:text-white hover:bg-green-600">
                            Marketplace
                        </a>
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-green-200 hover:text-white hover:bg-green-600">
                            Portfolio
                        </a>
                        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-green-200 hover:text-white hover:bg-green-600">
                            CO2 Saved
                        </a>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden" data-aos="fade-up">
                    {/* Progress Steps */}
                    <div className="border-b border-gray-200">
                        <div className="flex justify-between px-8 py-4">
                            <div className={`flex flex-col items-center ${step >= 1 ? 'text-green-600' : 'text-gray-400'}`} data-aos="fade-up" data-aos-delay="100">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-green-100 border-2 border-green-600' : 'bg-gray-100 border-2 border-gray-300'} transition-all duration-300`}>
                                    {step > 1 ? (
                                        <FiCheckCircle className="h-5 w-5" />
                                    ) : (
                                        <span>1</span>
                                    )}
                                </div>
                                <span className="mt-2 text-sm font-medium">Upload/Describe</span>
                            </div>
                            <div className={`flex flex-col items-center ${step >= 2 ? 'text-green-600' : 'text-gray-400'}`} data-aos="fade-up" data-aos-delay="200">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-green-100 border-2 border-green-600' : 'bg-gray-100 border-2 border-gray-300'} transition-all duration-300`}>
                                    {step > 2 ? (
                                        <FiCheckCircle className="h-5 w-5" />
                                    ) : (
                                        <span>2</span>
                                    )}
                                </div>
                                <span className="mt-2 text-sm font-medium">Details</span>
                            </div>
                            <div className={`flex flex-col items-center ${step >= 3 ? 'text-green-600' : 'text-gray-400'}`} data-aos="fade-up" data-aos-delay="300">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-green-100 border-2 border-green-600' : 'bg-gray-100 border-2 border-gray-300'} transition-all duration-300`}>
                                    <span>3</span>
                                </div>
                                <span className="mt-2 text-sm font-medium">Results</span>
                            </div>
                        </div>
                    </div>

                    {/* Step 1: Image Upload or Description */}
                    {step === 1 && (
                        <div className="p-8" data-aos="fade-up">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-800">Upload or Describe Waste</h2>
                                <p className="mt-2 text-gray-600">
                                    Upload a photo or provide a description of your agricultural waste for AI classification
                                </p>
                            </div>

                            <div className="mt-6 flex justify-center space-x-4">
                                <button
                                    onClick={() => setInputMethod('image')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${inputMethod === 'image' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                                    Upload Image
                                </button>
                                <button
                                    onClick={() => setInputMethod('text')}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${inputMethod === 'text' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    Describe Waste
                                </button>
                            </div>

                            <div className="mt-8 flex flex-col items-center">
                                {inputMethod === 'image' ? (
                                    <>
                                        {preview ? (
                                            <div className="relative" data-aos="zoom-in">
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
                                                className="h-64 w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-400 transition-colors duration-300 group"
                                                onClick={() => fileInputRef.current.click()}
                                                data-aos="fade-up"
                                                data-aos-delay="100"
                                            >
                                                <FiUpload className="h-12 w-12 text-gray-400 group-hover:text-green-500 transition-colors duration-300" />
                                                <p className="mt-2 text-gray-600">Click to upload or drag and drop</p>
                                                <p className="text-sm text-gray-500">JPG, PNG up to 5MB</p>
                                            </div>
                                        )}
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            name="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className='hidden'
                                        />
                                        <div className="mt-6">
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current.click()}
                                                className="relative group px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
                                                data-aos="fade-up"
                                                data-aos-delay="200"
                                            >
                                                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                                                <FiCamera className="mr-2 inline" />
                                                {preview ? 'Take Another Photo' : 'Take Photo'}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full max-w-md" data-aos="fade-up" data-aos-delay="100">
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="w-full h-40 p-4 border-2 border-gray-300 rounded-lg bg-white text-black focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                                            placeholder="Describe your agricultural waste (e.g., type, condition, approximate quantity)..."
                                        />

                                        <div className="mt-4 flex justify-center">
                                            <button
                                                onClick={handleDescriptionSubmit}
                                                className="relative group px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 disabled:opacity-50"
                                                disabled={!description.trim() || isLoading}
                                                data-aos="fade-up"
                                                data-aos-delay="200"
                                            >
                                                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                                                <FiEdit2 className="mr-2 inline" />
                                                {isLoading ? 'Processing...' : 'Submit Description'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded" data-aos="fade-up" data-aos-delay="300">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <FiInfo className="h-5 w-5 text-yellow-400" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-yellow-700">
                                            {inputMethod === 'image'
                                                ? 'For best results: Take clear photos in daylight, showing the waste pile from multiple angles if possible.'
                                                : 'Provide detailed information about the waste type, condition, and quantity for accurate classification.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Waste Details Form */}
                    {step === 2 && (
                        <div className="p-8" data-aos="fade-up">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-extrabold text-gray-800">Waste Classification & Details</h2>
                                <p className="mt-2 text-gray-600 text-sm max-w-xl mx-auto">
                                    Review the AI's classification and refine the details to help us process your agricultural waste efficiently.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* AI Result Summary */}
                                <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-md transition hover:shadow-lg" data-aos="fade-right">
                                    <h3 className="text-lg font-semibold text-green-800 mb-4">AI Prediction</h3>
                                    {classificationResult && (
                                        <div className="space-y-4 text-sm text-gray-800">
                                            <div>
                                                <p className="font-medium">Crop Type:</p>
                                                <div className="flex items-center justify-between">
                                                    <span>{classificationResult.cropType}</span>
                                                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                                        {classificationResult.confidence * 100}% confidence
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-medium">Moisture Level:</p>
                                                <span>{classificationResult.moistureLevel}</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Estimated Value:</p>
                                                <span>₹{classificationResult.estimatedValue} per ton</span>
                                            </div>
                                            <div className="pt-4">
                                                <button
                                                    onClick={() => setStep(1)}
                                                    className="text-sm text-green-600 hover:underline font-medium"
                                                >
                                                    ↺ Re-upload or re-describe
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 shadow-md space-y-5" data-aos="fade-left">
                                    <h3 className="text-lg font-semibold text-gray-800">Provide Details</h3>

                                    {/* Group 1 */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="cropType" className="block text-sm font-medium text-gray-700 mb-1">
                                                Type of Crop
                                            </label>
                                            <select
                                                id="cropType"
                                                name="cropType"
                                                value={formData.cropType}
                                                onChange={handleInputChange}
                                                className="form-select bg-white border border-gray-300 text-gray-900 rounded-md w-full py-2 px-3 focus:ring-green-500 focus:border-green-500"
                                                required
                                            >
                                                <option value="">Select crop type</option>
                                                <option value="Rice">Rice</option>
                                                <option value="Wheat">Wheat</option>
                                                <option value="Sugarcane">Sugarcane</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="moistureLevel" className="block text-sm font-medium text-gray-700 mb-1">
                                                Moisture Level
                                            </label>
                                            <select
                                                id="moistureLevel"
                                                name="moistureLevel"
                                                value={formData.moistureLevel}
                                                onChange={handleInputChange}
                                                className="form-select bg-white border border-gray-300 text-gray-900 rounded-md w-full py-2 px-3 focus:ring-green-500 focus:border-green-500"
                                                required
                                            >
                                                <option value="">Select moisture level</option>
                                                <option value="Low">Low (Dry)</option>
                                                <option value="Medium">Medium (Some moisture)</option>
                                                <option value="High">High (Wet)</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Waste Description */}
                                    <div>
                                        <label htmlFor="wasteDescription" className="block text-sm font-medium text-gray-700 mb-1">
                                            Waste Description
                                        </label>
                                        <textarea
                                            id="wasteDescription"
                                            name="wasteDescription"
                                            rows={3}
                                            value={formData.wasteDescription}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 text-black bg-white rounded-md p-3 focus:ring-green-500 focus:border-green-500"
                                            placeholder="Describe the waste material (e.g., straw, husk, stalks)..."
                                            required
                                        />
                                    </div>

                                    {/* Group 2 */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                                                Quantity
                                            </label>
                                            <input
                                                type="number"
                                                id="quantity"
                                                name="quantity"
                                                min="0.1"
                                                step="0.1"
                                                value={formData.quantity}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 bg-white text-black rounded-md p-2.5 focus:ring-green-500 focus:border-green-500"
                                                placeholder="e.g. 2.5"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="quantityUnit" className="block text-sm font-medium text-gray-700 mb-1">
                                                Unit
                                            </label>
                                            <select
                                                id="quantityUnit"
                                                name="quantityUnit"
                                                value={formData.quantityUnit}
                                                onChange={handleInputChange}
                                                className="form-select bg-white border border-gray-300 text-gray-900 rounded-md w-full py-2 px-3 focus:ring-green-500 focus:border-green-500"
                                                required
                                            >
                                                <option value="kg">Kilograms (kg)</option>
                                                <option value="ton">Tons</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Age + Location */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="ageOfWaste" className="block text-sm font-medium text-gray-700 mb-1">
                                                Age of Waste
                                            </label>
                                            <select
                                                id="ageOfWaste"
                                                name="ageOfWaste"
                                                value={formData.ageOfWaste}
                                                onChange={handleInputChange}
                                                className="form-select bg-white border border-gray-300 text-gray-900 rounded-md w-full py-2 px-3 focus:ring-green-500 focus:border-green-500"
                                                required
                                            >
                                                <option value="">Select age of waste</option>
                                                <option value="Fresh">Fresh (0–1 week)</option>
                                                <option value="1-2 weeks">1–2 weeks</option>
                                                <option value="2-4 weeks">2–4 weeks</option>
                                                <option value="1-2 months">1–2 months</option>
                                                <option value="2+ months">2+ months</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                                Location (Nearest Landmark)
                                            </label>
                                            <input
                                                type="text"
                                                id="location"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300 bg-white text-black rounded-md p-2.5 focus:ring-green-500 focus:border-green-500"
                                                placeholder="e.g. Near Krishi Farm, Pune Highway"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Additional Notes */}
                                    <div>
                                        <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
                                            Additional Notes
                                        </label>
                                        <textarea
                                            id="additionalNotes"
                                            name="additionalNotes"
                                            rows={2}
                                            value={formData.additionalNotes}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 text-black bg-white rounded-md p-3 focus:ring-green-500 focus:border-green-500"
                                            placeholder="Any special instructions or details about the waste..."
                                        />
                                    </div>

                                    {/* Submit Buttons */}
                                    <div className="flex justify-end space-x-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            ← Back
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="px-5 py-2 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all relative group"
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
                                        <p className="text-sm font-medium text-gray-500">Crop Type</p>
                                        <p className="mt-1 text-sm text-gray-900">{formData.cropType}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Waste Description</p>
                                        <p className="mt-1 text-sm text-gray-900">{formData.wasteDescription}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Quantity</p>
                                        <p className="mt-1 text-sm text-gray-900">{formData.quantity} {formData.quantityUnit}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Moisture Level</p>
                                        <p className="mt-1 text-sm text-gray-900">{formData.moistureLevel}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Age of Waste</p>
                                        <p className="mt-1 text-sm text-gray-900">{formData.ageOfWaste}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Location</p>
                                        <p className="mt-1 text-sm text-gray-900">{formData.location}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Intended Use</p>
                                        <p className="mt-1 text-sm text-gray-900">{formData.intendedUse}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Estimated Value</p>
                                        <p className="mt-1 text-sm text-gray-900">
                                            ₹{Math.round(classificationResult.estimatedValue * parseFloat(formData.quantity || 1))}
                                            <span className="text-gray-500"> (₹{classificationResult.estimatedValue}/ton)</span>
                                        </p>
                                    </div>
                                    {formData.additionalNotes && (
                                        <div className="sm:col-span-2">
                                            <p className="text-sm font-medium text-gray-500">Additional Notes</p>
                                            <p className="mt-1 text-sm text-gray-900">{formData.additionalNotes}</p>
                                        </div>
                                    )}
                                    {preview && (
                                        <div className="sm:col-span-2">
                                            <p className="text-sm font-medium text-gray-500">Uploaded Image</p>
                                            <img
                                                src={preview}
                                                alt="Waste preview"
                                                className="mt-2 h-48 w-full object-contain rounded-lg border border-gray-200"
                                            />
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
                                    onClick={() => {/* Navigate to dashboard */ }}
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