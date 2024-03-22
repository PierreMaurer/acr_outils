import React, { useState } from 'react';

export const AdrenalineContext = React.createContext();

export const AdrenalineProvider = ({ children }) => {
    const [adreTimes, setAdreTimes] = useState([]); // Définir une valeur initiale

    return (
        <AdrenalineContext.Provider value={[adreTimes, setAdreTimes ]}>
            {children}
        </AdrenalineContext.Provider>
    );
};
