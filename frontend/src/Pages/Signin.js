// import React, { useContext, useState } from 'react'
// import './Signin.css'
// import axios from 'axios'
// import { AuthContext } from '../Context/AuthContext.js'
// import Switch from '@material-ui/core/Switch';

// function Signin() {
//     const [isStudent, setIsStudent] = useState(true)
//     const [admissionId, setAdmissionId] = useState()
//     const [employeeId,setEmployeeId] = useState()
//     const [password, setPassword] = useState()
//     const [error, setError] = useState("")
//     const { dispatch } = useContext(AuthContext)

//     const API_URL = process.env.REACT_APP_API_URL
    
//     const loginCall = async (userCredential, dispatch) => {
//         dispatch({ type: "LOGIN_START" });
//         try {
//             const res = await axios.post(API_URL+"api/auth/signin", userCredential);
//             dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
//         }
//         catch (err) {
//             dispatch({ type: "LOGIN_FAILURE", payload: err })
//             setError("Wrong Password Or Username")
//         }
//     }

//     const handleForm = (e) => {
//         e.preventDefault()
//         isStudent
//         ? loginCall({ admissionId, password }, dispatch)
//         : loginCall({ employeeId,password }, dispatch)
//     }

//     return (
//         <div className='signin-container'>
//             <div className="signin-card">
//                 <form onSubmit={handleForm}>
//                     <h2 className="signin-title"> Log in</h2>
//                     <p className="line"></p>
//                     <div className="persontype-question">
//                         <p>Are you a Staff member ?</p>
//                         <Switch
//                             onChange={() => setIsStudent(!isStudent)}
//                             color="primary"
//                         />
//                     </div>
//                     <div className="error-message"><p>{error}</p></div>
//                     <div className="signin-fields">
//                         <label htmlFor={isStudent?"admissionId":"employeeId"}> <b>{isStudent?"Admission ID":"Employee ID"}</b></label>
//                         <input className='signin-textbox' type="text" placeholder={isStudent?"Enter Admission ID":"Enter Employee ID"} name={isStudent?"admissionId":"employeeId"} required onChange={(e) => { isStudent?setAdmissionId(e.target.value):setEmployeeId(e.target.value) }}/>
//                         <label htmlFor="password"><b>Password</b></label>
//                         <input className='signin-textbox' type="password" minLength='6' placeholder="Enter Password" name="psw" required onChange={(e) => { setPassword(e.target.value) }} />
//                         </div>
//                     <button className="signin-button">Log In</button>
//                     <a className="forget-pass" href="#home">Forgot password?</a>
//                 </form>
//                 <div className='signup-option'>
//                     <p className="signup-question">Don't have an account? Contact Librarian</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Signin

import React, { useContext, useState } from 'react'
import './Signin.css'
import axios from 'axios'
import { AuthContext } from '../Context/AuthContext.js'
// Removed: import Switch from '@material-ui/core/Switch'; // Removed Material UI import to prevent compilation errors
import { Link } from 'react-router-dom'; // Import Link for navigation

function Signin() {
    const [isStudent, setIsStudent] = useState(true)
    const [admissionId, setAdmissionId] = useState('')
    const [employeeId,setEmployeeId] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")
    const { dispatch } = useContext(AuthContext)

    // Fallback for API_URL if environment variable is not set
    const API_URL = process.env.REACT_APP_API_URL || `${window.location.origin}/`;
    
    const loginCall = async (userCredential, dispatch) => {
        dispatch({ type: "LOGIN_START" });
        try {
            // Ensure API_URL ends with a slash for clean concatenation
            const baseUrl = API_URL.endsWith('/') ? API_URL : `${API_URL}/`;
            const res = await axios.post(baseUrl + "api/auth/signin", userCredential);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        }
        catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err })
            setError("Wrong Password or User ID. Please check your credentials.")
        }
    }

    const handleForm = (e) => {
        e.preventDefault()
        setError("") // Clear previous error
        isStudent
        ? loginCall({ admissionId, password }, dispatch)
        : loginCall({ employeeId, password }, dispatch)
    }

    return (
        <div className='signin-container'>
            <div className="signin-card">
                <form onSubmit={handleForm}>
                    <h2 className="signin-title"> Log in</h2>
                    <p className="line"></p>
                    <div className="persontype-question">
                        <p>Are you a Staff member ?</p>
                        {/* Replaced Material UI Switch with custom styled HTML checkbox */}
                        <label className="custom-switch">
                            <input
                                type="checkbox"
                                checked={!isStudent} // Checked when NOT a student (i.e., is staff)
                                onChange={() => setIsStudent(!isStudent)}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="error-message"><p>{error}</p></div>
                    <div className="signin-fields">
                        <label htmlFor={isStudent?"admissionId":"employeeId"}> <b>{isStudent?"Admission ID":"Employee ID"}</b></label>
                        <input 
                            className='signin-textbox' 
                            type="text" 
                            placeholder={isStudent?"Enter Admission ID":"Enter Employee ID"} 
                            name={isStudent?"admissionId":"employeeId"} 
                            required 
                            onChange={(e) => { isStudent?setAdmissionId(e.target.value):setEmployeeId(e.target.value) }}
                        />
                        <label htmlFor="password"><b>Password</b></label>
                        <input 
                            className='signin-textbox' 
                            type="password" 
                            minLength='6' 
                            placeholder="Enter Password" 
                            name="psw" 
                            required 
                            onChange={(e) => { setPassword(e.target.value) }} 
                        />
                    </div>
                    <button className="signin-button">Log In</button>
                    <a className="forget-pass" href="#home">Forgot password?</a>
                </form>
                
                {/* --- CRITICAL CHANGE: Added Link to Registration Page --- */}
                <div className='signup-option'>
                    <p className="signup-question">
                        Don't have an account? 
                        <Link to="/register" style={{marginLeft: '5px', color: '#007bff', textDecoration: 'underline', fontWeight: 'bold'}}>
                            Register Here
                        </Link>
                    </p>
                </div>
                {/* -------------------------------------------------------- */}
            </div>
        </div>
    )
}

export default Signin
