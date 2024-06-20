import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../cssHelper/helper.css';

function Sign() {
    const navigate = useNavigate();

    // State for user data and error messages
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const [emailError, setEmailError] = useState({
        required: false,
        format: false
    });

    const [passwordError, setPasswordError] = useState({
        required: false,
        minLength: false
    });

    // Function to handle input changes and validate
    const addUserData = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });

        // Validate email
        if (name === 'email') {
            if (value.trim() === '') {
                setEmailError({
                    required: true,
                    format: false
                });
            } else if (!/\S+@\S+\.\S+/.test(value)) {
                setEmailError({
                    required: false,
                    format: true
                });
            } else {
                setEmailError({
                    required: false,
                    format: false
                });
            }
        }

        // Validate password
        if (name === 'password') {
            if (value.length === 0) {
                setPasswordError({
                    required: true,
                    minLength: false
                });
            } else if (value.length < 8) {
                setPasswordError({
                    required: false,
                    minLength: true
                });
            } else {
                setPasswordError({
                    required: false,
                    minLength: false
                });
            }
        }
    };

    // Function to handle sign up
    const signUp = async () => {
        // Check if there are any validation errors
        if (emailError.required || emailError.format || passwordError.required || passwordError.minLength) {
            return; // If there are errors, do not proceed with sign up
        }

        try {
            const response = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const responseData = await response.json();
            console.log(responseData);

            if (responseData.success) {
                window.location.replace('/account/login');
            } else {
                alert(responseData.error);
            }
        } catch (err) {
            alert('Error:', err);
        }
    };

    return (
        <div className="login-wrapper account-wrapper radius flex flex-column a-center j-center gap pad shadow black-clr white-bg w-full">
            <p className="font-md bold">Create an account</p>
            <div className="form flex w-full flex-column relative">
                <label htmlFor="email">Enter your email or phone</label>
                <input
                    onChange={addUserData}
                    value={userData.email}
                    name='email'
                    type="text"
                    placeholder="Enter email address"
                    className="radius"
                    id="email"
                />
                <div className="email-error absolute right flex gap-1 a-center">
                    <h5 className={`email-required light red-clr ${emailError.required ? '' : 'none'}`}>
                        This field is required
                    </h5>
                    <h5 className={`email-format light red-clr ${emailError.format ? '' : 'none'}`}>
                        Invalid email format
                    </h5>
                </div>

                <label htmlFor="password">Enter your password</label>
                <input
                    onChange={addUserData}
                    value={userData.password}
                    type="password"
                    placeholder="Enter password"
                    className="radius"
                    name="password"
                    id="password"
                />
                <div className="password-error absolute right flex gap-1 a-center">
                    <h5 className={`password-required light red-clr ${passwordError.required ? '' : 'none'}`}>
                        This field is required
                    </h5>
                    <h5 className={`password-min-length light red-clr ${passwordError.minLength ? '' : 'none'}`}>
                        Minimum 8 characters required
                    </h5>
                </div>

                <p className="font-sm text-center">
                    OR
                </p>

                <div className="google w-full radius border-green height flex a-center gap pad-inline pointer">
                    <img width="48" height="48" src="https://img.icons8.com/color/48/google-logo.png" alt="Google Logo" />
                    Continue with Google
                </div>
                <div className="google w-full radius border-green height flex a-center gap pad-inline pointer">
                    <img width="48" height="48" src="https://img.icons8.com/color/48/microsoft.png" alt="Microsoft Logo" />
                    Continue with Microsoft account
                </div>
                <div className="google w-full radius border-green height flex a-center gap pad-inline pointer">
                    <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/mac-os.png" alt="Apple Logo" />
                    Continue with Apple ID
                </div>

                <p>
                    By continuing, you agree to our <span className="terms pointer">Terms of Use</span> and{' '}
                    <span className="terms pointer">Privacy Policy</span>
                </p>
                <input onClick={signUp} type="submit" className="radius submit font-sm bold white-clr pointer" value="Sign up" />
            </div>
            <p className="text-center">
                Already have an account? <span className='pointer' onClick={() => navigate('/account/login')}>Login</span>
            </p>
        </div>
    );
}

export default Sign;
