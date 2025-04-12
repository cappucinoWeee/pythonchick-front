// src/components/common/FullScreenSpin.js
import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// A Spin component that works correctly with the tip prop
const FullScreenSpin = ({ tip = "Loading...", size = "large" }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Spin 
        indicator={<LoadingOutlined style={{ fontSize: size === "large" ? 32 : 24 }} spin />} 
      />
      <div className="mt-4 text-gray-600">{tip}</div>
    </div>
  );
};

export default FullScreenSpin;