import React from 'react';
import MainContent from '../components/MainContent';
import SidebarWithHeader from '../components/Sidebar';

const Main = () => {
    return (
        <>
            <SidebarWithHeader>
                <MainContent />
            </SidebarWithHeader>
        </>
    );
};

export default Main;