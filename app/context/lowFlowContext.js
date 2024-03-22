import React, { useState } from 'react';

export const LowFlowContext = React.createContext();

export const LowFlowProvider = ({ children }) => {
    const [lowFlow, setlowFlow] = useState(0);

    return (
        <LowFlowContext.Provider value={{ lowFlow, setlowFlow }}>
            {children}
        </LowFlowContext.Provider>
    );
};
