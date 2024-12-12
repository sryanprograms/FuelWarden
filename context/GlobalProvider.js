import { createContext, useContext, useState, useEffect } from 'react';

// Import your Appwrite utilities
import { getCurrentUser } from '../lib/appwrite';

// Create the context
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => { 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // TEMPORARY BYPASS FLAG
    const bypassAuth = true; // Set to `false` to restore real authentication

    useEffect(() => {
        if (bypassAuth) {
            // Mock authentication for testing
            setIsLoggedIn(true);
            setUser({
                $id: "mockUserId",
                email: "testuser@example.com",
                username: "Test User",
            });
            setIsLoading(false);
        } else {
            // Real authentication logic
            getCurrentUser()
                .then((res) => {
                    if (res) {
                        setIsLoggedIn(true);
                        setUser(res);
                    } else {
                        setIsLoggedIn(false);
                        setUser(null);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [bypassAuth]);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
