const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const BASE_URL = 'http://localhost:3000/api/v1/auth';
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/joborbit';

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTests() {
    console.log('--- Starting Auth Flow Tests ---');
    
    const timestamp = Date.now();
    const user = {
        fullName: 'Test User',
        username: `testu${Math.floor(timestamp/1000)}`, // short username
        email: `test${timestamp}@example.com`,
        password: 'Password123!',
        confirmPassword: 'Password123!',
    };
    
    try {
        console.log('1. Registering user...');
        const regRes = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        const regData = await regRes.json();
        if (!regRes.ok) throw new Error(JSON.stringify(regData));
        console.log('Register success:', regRes.status);
        
        // Wait a bit for the DB to save OTP
        await sleep(1000);
        
        // Read OTP from DB
        console.log('2. Fetching OTP from DB...');
        await mongoose.connect(MONGO_URI);
        const Otp = require('./src/modules/auth/models/otp.model.js');
        const otpRecord = await Otp.findOne({ email: user.email, type: 'registration' });
        
        if (!otpRecord) {
            throw new Error('OTP not found in database!');
        }
        console.log('Found OTP:', otpRecord.otp);
        
        console.log('3. Verifying OTP...');
        const verifyRes = await fetch(`${BASE_URL}/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, otp: otpRecord.otp })
        });
        const verifyData = await verifyRes.json();
        if (!verifyRes.ok) throw new Error(JSON.stringify(verifyData));
        console.log('Verify success:', verifyRes.status);
        
        console.log('4. Logging in...');
        const loginRes = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, password: user.password })
        });
        const loginData = await loginRes.json();
        if (!loginRes.ok) throw new Error(JSON.stringify(loginData));
        console.log('Login success:', loginRes.status, 'Tokens received');
        
        console.log('--- All tests passed! ---');
    } catch (err) {
        console.error('Test Failed!', err.message);
    } finally {
        await mongoose.disconnect();
    }
}

runTests();
