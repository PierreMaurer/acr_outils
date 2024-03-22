import React, { useState } from 'react';

export const ChocContext = React.createContext();

export const ChocProvider = ({ children }) => {
    const [choc, setChoc] = useState(0); // Définir une valeur initiale

    return (
        <ChocContext.Provider value={{ choc, setChoc }}>
            {children}
        </ChocContext.Provider>
    );
};
