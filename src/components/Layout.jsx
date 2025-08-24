import React from 'react';
import Sidebar from './Sidebar';


const Layout = ({ children }) => {
  return (
   
    <div className="flex h-screen bg-gray-100 overflow-hidden">
     
      <Sidebar />
      
     
      <main className="flex-1 overflow-y-auto transition-all duration-300">
       
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
