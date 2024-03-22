import React, { useState } from 'react';

export const AmiodaroneContext = React.createContext();

export const AmiodaroneProvider = ({ children }) => {
    const [amioTimes, setAmioTimes] = useState([]); // Définir une valeur initiale

    return (
        <AmiodaroneContext.Provider value={[amioTimes, setAmioTimes ]}>
            {children}
        </AmiodaroneContext.Provider>
    );
};
