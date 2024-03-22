import React, { useState } from 'react';

export const AnalyzeContext = React.createContext();

export const AnalyzeProvider = ({ children }) => {
    const [analyze, setAnalyze] = useState(0); // Définir une valeur initiale

    return (
        <AnalyzeContext.Provider value={[analyze, setAnalyze ]}>
            {children}
        </AnalyzeContext.Provider>
    );
};
