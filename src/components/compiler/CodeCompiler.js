// src/components/compiler/CodeCompiler.js
import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Tabs, Input, Space, Divider, message, Spin } from 'antd';
import {
  PlayCircleOutlined,
  CheckOutlined,
  ReloadOutlined,
  CodeOutlined,
  LoadingOutlined,
  SaveOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import codeService from '../../services/codeService';

const { TabPane } = Tabs;
const { TextArea } = Input;

const CodeCompiler = ({
  initialCode = '# Write your code here\n',
  expectedOutput = '',
  onSuccess = () => {},
  onError = () => {},
  readOnly = false,
  saveEnabled = false,
  title = '',
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('code');

  // Reset code if initialCode prop changes
  useEffect(() => {
    setCode(initialCode);
    setOutput('');
    setError('');
    setSuccess(false);
  }, [initialCode]);

  const runCode = async () => {
    setLoading(true);
    setError('');
    setOutput('');
    setSuccess(false);

    try {
      // Call the API to execute the code
      const result = await codeService.executeCode(code, expectedOutput);

      setOutput(result.output || '');

      if (result.error) {
        setError(result.error);
        onError(result.error);
      }

      // Check if the output matches the expected output
      if (expectedOutput && result.success) {
        const outputMatches = expectedOutput.trim() === result.output.trim();

        if (outputMatches) {
          setSuccess(true);
          onSuccess(code);
          message.success('Your code produced the correct output!');
        } else if (expectedOutput) {
          message.warning('Your code ran successfully but did not produce the expected output.');
        }
      } else if (result.success) {
        message.success('Code executed successfully!');
      }

      // Switch to output tab to see results
      setActiveTab('output');
    } catch (err) {
      console.error('Code execution error:', err);

      // Handle different error types
      if (err.response && err.response.data) {
        setError(err.response.data.detail || 'Error executing code. Please try again.');
      } else {
        setError('An error occurred while executing the code. Please try again.');
      }

      onError(err);
    } finally {
      setLoading(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
    setError('');
    setSuccess(false);
    setActiveTab('code');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    message.success('Code copied to clipboard!');
  };

  const saveCode = async () => {
    if (!saveEnabled) return;

    try {
      // Show a success message as this is just a mockup
      message.success('Code saved successfully!');
    } catch (err) {
      message.error('Failed to save code. Please try again.');
    }
  };

  return (
    <Card className="compiler-card" title={title}>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane
          tab={
            <span>
              <CodeOutlined /> Code
            </span>
          }
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
              placeholder="Write your Python code here..."
            />
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <PlayCircleOutlined /> Output
            </span>
          }
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
                {output && <pre className="code-output p-2 bg-gray-50 rounded">{output}</pre>}
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
          <Button icon={<ReloadOutlined />} onClick={resetCode} disabled={readOnly || loading}>
            Reset
          </Button>
        </Space>

        <Space>
          {saveEnabled && (
            <Button icon={<SaveOutlined />} onClick={saveCode} disabled={loading}>
              Save
            </Button>
          )}
          <Button icon={<CopyOutlined />} onClick={copyCode} disabled={loading}>
            Copy
          </Button>
        </Space>
      </div>
    </Card>
  );
};

export default CodeCompiler;
