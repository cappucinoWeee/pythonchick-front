// src/components/compiler/CodeCompiler.js
import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Tabs, Input, Space, Divider } from 'antd';
import { 
  PlayCircleOutlined, 
  CheckOutlined, 
  ReloadOutlined,
  CodeOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { TabPane } = Tabs;
const { TextArea } = Input;

const CodeCompiler = ({ 
  initialCode = '# Write your code here\n', 
  expectedOutput = '', 
  onSuccess = () => {},
  readOnly = false
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('code');
  
  const runCode = async () => {
    setLoading(true);
    setError('');
    setOutput('');
    
    try {
      const response = await axios.post('/api/v1/code/execute', {
        code,
        expected_output: expectedOutput
      });
      
      const result = response.data;
      
      setOutput(result.output);
      if (result.error) {
        setError(result.error);
      }
      
      if (result.matches_expected) {
        setSuccess(true);
        onSuccess(code);
      } else {
        setSuccess(false);
      }
      
      // Switch to output tab to see results
      setActiveTab('output');
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred while executing the code');
    } finally {
      setLoading(false);
    }
  };
  
  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
    setError('');
    setSuccess(false);
  };
  
  return (
    <Card className="compiler-card">
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane 
          tab={<span><CodeOutlined /> Code</span>}
          key="code"
        >
          <div className="compiler-code-container">
            <TextArea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoSize={{ minRows: 8, maxRows: 16 }}
              style={{ fontFamily: 'monospace' }}
              disabled={readOnly || loading}
              className="code-editor"
            />
          </div>
        </TabPane>
        <TabPane 
          tab={<span><PlayCircleOutlined /> Output</span>}
          key="output"
        >
          <div className="compiler-output-container">
            {loading ? (
              <div className="text-center p-4">
                <LoadingOutlined style={{ fontSize: 24 }} spin />
                <p className="mt-2">Running your code...</p>
              </div>
            ) : (
              <>
                {expectedOutput && (
                  <div className="mb-4">
                    <Divider>Expected Output</Divider>
                    <pre className="expected-output p-2 bg-gray-50 rounded">{expectedOutput}</pre>
                  </div>
                )}
                <Divider>Your Output</Divider>
                {output && (
                  <pre className="code-output p-2 bg-gray-50 rounded">{output}</pre>
                )}
                {error && (
                  <Alert 
                    message="Error"
                    description={<pre className="error-output">{error}</pre>}
                    type="error"
                    showIcon
                  />
                )}
                {success && (
                  <Alert
                    message="Success!"
                    description="Your code produced the expected output."
                    type="success"
                    showIcon
                    icon={<CheckOutlined />}
                  />
                )}
                {!output && !error && !loading && (
                  <div className="text-center text-gray-500 p-4">
                    Run your code to see the output here
                  </div>
                )}
              </>
            )}
          </div>
        </TabPane>
      </Tabs>
      
      <div className="mt-4 flex justify-between">
        <Space>
          <Button 
            type="primary" 
            icon={<PlayCircleOutlined />} 
            onClick={runCode}
            loading={loading}
            disabled={readOnly}
          >
            Run Code
          </Button>
          <Button 
            icon={<ReloadOutlined />} 
            onClick={resetCode}
            disabled={readOnly || loading}
          >
            Reset
          </Button>
        </Space>
      </div>
    </Card>
  );
};

export default CodeCompiler;