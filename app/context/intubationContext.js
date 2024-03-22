import React, { useState } from 'react';

export const IntubationContext = React.createContext();

export const IntubationProvider = ({ children }) => {
    const [intubTimes, setIntubTimes] = useState('Non intubé');

    return (
        <IntubationContext.Provider value={{ intubTimes, setIntubTimes }}>
            {children}
        </IntubationContext.Provider>
    );
};
