import React, { useState } from 'react';

export const NoFlowContext = React.createContext();

export const NoFlowProvider = ({ children }) => {
    const [noFlow, setNoFlow] = useState(0);

    return (
        <NoFlowContext.Provider value={{ noFlow, setNoFlow }}>
            {children}
        </NoFlowContext.Provider>
    );
};
