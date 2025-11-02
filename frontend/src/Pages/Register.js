import React, { useState } from 'react';

// Function component name from user's request, exported as App for single-file mandate.
function App() { 
    // State for mandatory registration fields
    const [userFullName, setUserFullName] = useState('');
    const [admissionId, setAdmissionId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // State for new student-specific fields
    const [age, setAge] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const API_URL = "http://localhost:3000"; 

    // Placeholder for handleRegister logic
    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic form validation
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        try {
            const baseUrl = API_URL.endsWith('/') ? API_URL : `${API_URL}/`;
            const endpoint = baseUrl + "api/auth/register";

            console.log("Attempting to register student at:", endpoint);
            
            // Placeholder: Simulate API call success/failure
            const successSim = Math.random() > 0.1; 

            if (successSim) {
                setSuccess('Registration successful! Redirecting to sign in...');
                
                // Clear form fields on successful registration
                setUserFullName('');
                setAdmissionId('');
                setEmail('');
                setPassword('');
                setAge('');
                setDob('');
                setGender('');
                setAddress('');
                
                // User's original navigation workaround
                setTimeout(() => {
                    // window.location.href = '/signin'; // Disabled for canvas preview
                    console.log("Redirecting to /signin..."); 
                }, 2000);
            } else {
                 setError('Registration Failed. Admission ID or Email already registered. (Simulated)');
            }

        } catch (err) {
            setError('A network error occurred during registration.');
        }
    };

    return (
        <div className="register-container">
            {/* Main Form Card */}
            <div className="form-card">
                
                {/* Heading */}
                <h2 className="title">
                    STUDENT REGISTRATION
                </h2>

                {/* Error/Success Alerts */}
                {error && (
                    <div className="alert error-alert" role="alert">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="alert success-alert" role="alert">
                        {success}
                    </div>
                )}
                
                {/* Form Container */}
                <form 
                    className="form-content" 
                    onSubmit={handleRegister}
                >
                    
                    {/* Grid for Personal Details */}
                    <div className="grid-layout">
                        
                        {/* Full Name Field */}
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                id="fullName"
                                type="text"
                                required
                                placeholder="E.g., Jane Doe"
                                value={userFullName}
                                onChange={(e) => setUserFullName(e.target.value)}
                                className="form-input"
                            />
                        </div>

                        {/* Admission ID Field */}
                        <div className="form-group">
                            <label htmlFor="admissionId">Admission ID</label>
                            <input
                                id="admissionId"
                                type="text"
                                required
                                placeholder="E.g., 2024-01-A"
                                value={admissionId}
                                onChange={(e) => setAdmissionId(e.target.value)}
                                className="form-input"
                            />
                        </div>

                        {/* Age Field */}
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <input
                                id="age"
                                type="number"
                                required
                                min="10"
                                max="100"
                                placeholder="Your current age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="form-input"
                            />
                        </div>
                        
                        {/* Date of Birth Field */}
                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <input
                                id="dob"
                                type="date"
                                required
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                className="form-input"
                            />
                        </div>

                        {/* Gender Dropdown */}
                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                required
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="form-input"
                                style={{ appearance: 'none' }} // Remove default select styling
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Email Field */}
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                required
                                placeholder="your.email@school.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-input"
                            />
                        </div>
                    </div>

                    {/* Address Field (full width and proper textarea) */}
                    <div className="form-group">
                        <label htmlFor="address">Full Address</label>
                        <textarea
                            id="address"
                            required
                            rows="3"
                            placeholder="Enter your complete mailing address (street, city, state, zip)"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-input"
                            style={{ resize: 'vertical' }}
                        ></textarea>
                    </div>

                    {/* Password Field (Full width) */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            required
                            minLength="6"
                            placeholder="Must be at least 6 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="submit-button"
                    >
                        Register Student
                    </button>
                </form>

                <div className="signin-link-container">
                    <p className="signin-link-text">
                        Already have an account? 
                        <a href="/signin" className="signin-link">
                            Sign In
                        </a>
                    </p>
                </div>
            </div>

            {/* --- CSS STYLES FOR PROFESSIONAL LOOK --- */}
            <style>
                {`
                    /* General Layout & Font */
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
                    body {
                        font-family: 'Inter', sans-serif;
                        height: 100%; 
                        margin: 0;
                    }

                    .register-container {
                        display: flex;
                        justify-content: center;
                        width: 100%;
                        padding: 32px; /* p-8 */
                        box-sizing: border-box;
                        min-height: 100vh; /* Ensures content takes at least full viewport height */
                    }

                    /* Card Styling */
                    .form-card {
                        width: 100%;
                        max-width: 500px; /* max-w-xl */
                        padding: 32px;
                        background-color: #ffffff;
                        border-radius: 20px; /* rounded-3xl */
                        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); /* shadow-2xl */
                        border: 1px solid #f3f4f6; /* border-gray-100 */
                        margin: 0 auto;
                        position: relative;
                        z-index: 10;
                    }

                    /* Typography */
                    .title {
                        color: #173a7f; /* Darker blue color */
                        
                        /* FINAL FIX: Ensure text wraps if necessary, but keep it bold and centered. */
                        font-size: 24px; 
                        font-weight: 900; 
                        text-align: center;
                        
                        /* Increased margin below the title for separation */
                        margin-bottom: 12px; 
                        
                        text-transform: uppercase; 
                        letter-spacing: 1px;
                        /* Removed white-space: nowrap and overflow: hidden to allow full text visibility */
                    }
                    @media (min-width: 640px) { 
                        .title {
                            /* Slightly adjusted size for a perfect fit on desktop */
                            font-size: 32px; /* Set to 32px, which fits the word REGISTRATION */
                            margin-bottom: 8px; 
                        }
                    }

                    /* Form and Grid */
                    .form-content {
                        display: flex;
                        flex-direction: column;
                        gap: 24px; /* space-y-6 */
                        
                        overflow-y: visible; 
                        max-height: none;
                        padding-right: 0; 
                    }
                    
                    .grid-layout {
                        display: grid;
                        grid-template-columns: 1fr;
                        gap: 24px;
                    }
                    @media (min-width: 640px) { /* sm:grid-cols-2 */
                        .grid-layout {
                            grid-template-columns: repeat(2, minmax(0, 1fr));
                        }
                    }

                    .form-group {
                        display: flex;
                        flex-direction: column;
                    }

                    /* Field Label Styling (Key Names) */
                    .form-group label {
                        font-size: 16px; 
                        font-weight: 600; 
                        color: #1f2937; 
                        margin-bottom: 4px;
                        transition: color 0.15s;
                    }
                    /* Optional: slight highlight on focus */
                    .form-input:focus + label {
                        color: #2563eb;
                    }

                    .form-input {
                        width: 100%;
                        padding: 12px 16px; /* py-3 px-4 */
                        border: 1px solid #d1d5db; /* border-gray-300 */
                        border-radius: 12px; /* rounded-xl */
                        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
                        outline: none;
                        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
                        box-sizing: border-box;
                    }

                    .form-input:focus {
                        border-color: #60a5fa; /* blue-400 */
                        box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.5); /* ring-2 focus:ring-blue-400 */
                    }

                    /* Button Styling */
                    .submit-button {
                        width: 100%;
                        margin-top: 32px; /* mt-8 */
                        padding: 12px 16px;
                        color: white;
                        background-color: #2563eb; /* blue-600 */
                        border-radius: 12px; /* rounded-xl */
                        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
                        border: none;
                        font-weight: 600;
                        cursor: pointer;
                        transition: background-color 0.3s, transform 0.3s;
                    }
                    .submit-button:hover {
                        background-color: #1e40af; /* blue-700 */
                        transform: scale(1.01);
                    }
                    .submit-button:focus {
                        outline: 2px solid transparent;
                        outline-offset: 2px;
                        box-shadow: 0 0 0 2px #fff, 0 0 0 4px #3b82f6; /* ring-2 focus:ring-blue-500 */
                    }

                    /* Alerts */
                    .alert {
                        padding: 16px;
                        margin-bottom: 16px;
                        font-size: 14px;
                        font-weight: 600;
                        border-radius: 12px;
                        transition: all 0.3s ease-in-out;
                    }
                    .error-alert {
                        color: #991b1b; /* red-800 */
                        background-color: #fee2e2; /* red-100 */
                        border: 1px solid #fca5a5; /* red-300 */
                    }
                    .success-alert {
                        color: #065f46; /* green-800 */
                        background-color: #d1fae5; /* green-100 */
                        border: 1px solid #a7f3d0; /* green-300 */
                    }

                    /* Sign In Link */
                    .signin-link-container {
                        margin-top: 24px;
                        text-align: center;
                    }
                    .signin-link-text {
                        font-size: 14px;
                        color: #4b5563; /* gray-600 */
                    }
                    .signin-link {
                        margin-left: 4px;
                        font-weight: 600;
                        color: #2563eb; /* blue-600 */
                        text-decoration: none;
                        transition: color 0.15s;
                    }
                    .signin-link:hover {
                        color: #3b82f6; /* blue-500 */
                    }
                `}
            </style>
        </div>
    );
}

export default App;
