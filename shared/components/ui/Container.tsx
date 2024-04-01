// CustomContainer.tsx

import React from 'react';

interface CustomContainerProps {
    children: React.ReactNode;
}

const Container: React.FC<CustomContainerProps> = ({ children }) => {
    return (
        <div className="container mx-auto px-4 md:px-4 sm:px-10 lg:px-[100px] w-full ">{children}</div>
    );
};

export default Container;
