import React, { createContext, useContext, useState } from 'react';
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'YOUR_USER_POOL_ID', // Your user pool id here
    ClientId: 'YOUR_APP_CLIENT_ID', // Your client id here
};

const userPool = new CognitoUserPool(poolData);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signUp = (email, password) => {
        return new Promise((resolve, reject) => {
            userPool.signUp(email, password, [], null, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    };

    const signIn = (email, password) => {
        return new Promise((resolve, reject) => {
            const authenticationDetails = new AuthenticationDetails({ Username: email, Password: password });
            const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (result) => {
                    setUser(result);
                    resolve(result);
                },
                onFailure: (err) => reject(err),
            });
        });
    };

    const signOut = () => {
        if (user) {
            user.signOut();
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
