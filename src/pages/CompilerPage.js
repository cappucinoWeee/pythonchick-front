// src/pages/CompilerPage.js
import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Breadcrumb, 
  Row, 
  Col, 
  Button,
  Select,
  Input,
  Divider
} from 'antd';
import { Link } from 'react-router-dom';
import { 
  HomeOutlined, 
  CodeOutlined, 
  SaveOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import CodeCompiler from '../components/compiler/CodeCompiler';

const { Title, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const CompilerPage = () => {
  const [fileName, setFileName] = useState('untitled.py');
  const [code, setCode] = useState('# Write your Python code here\n\nprint("Hello, World!")\n');
  
  const templates = {
    empty: '# Write your Python code here\n',
    hello_world: '# Simple Hello World program\n\nprint("Hello, World!")\n',
    variables: '# Variables and data types\n\nname = "Alice"\nage = 25\nheight = 1.75\n\nprint(f"Name: {name}")\nprint(f"Age: {age}")\nprint(f"Height: {height} meters")\n',
    functions: '# Function example\n\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Python"))\n',
    loops: '# Loop example\n\nfruits = ["apple", "banana", "cherry"]\n\nfor fruit in fruits:\n    print(f"I like {fruit}s")\n\nfor i in range(5):\n    print(f"Number: {i}")\n',
  };
  
  const handleTemplateChange = (template) => {
    setCode(templates[template]);
  };
  
  const handleSaveCode = () => {
    // In a real app, this would save to the user's account
    alert('Code saved! (This would save to your account in a real app)');
  };
  
  const handleDownloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };
  
  return (
    <div className="compiler-page pb-6">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/dashboard">
            <HomeOutlined /> Dashboard
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <CodeOutlined /> Python Compiler
        </Breadcrumb.Item>
      </Breadcrumb>
      
      <Card className="shadow-md border-0 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <Title level={2}>Python Code Compiler</Title>
            <Paragraph className="text-gray-600">
              Write, run and test your Python code in real-time
            </Paragraph>
          </div>
          
          <div className="flex items-center space-x-2">
            <Input 
              placeholder="File name" 
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              style={{ width: 200 }}
            />
            <Button 
              icon={<SaveOutlined />} 
              onClick={handleSaveCode}
              title="Save code"
            >
              Save
            </Button>
            <Button 
              icon={<DownloadOutlined />} 
              onClick={handleDownloadCode}
              title="Download code"
            >
              Download
            </Button>
            <Button 
              icon={<CopyOutlined />} 
              onClick={handleCopyCode}
              title='Copy code'
            />

<Button 
              icon={<DeleteOutlined />} 
              onClick={() => setCode(templates.empty)}
              title="Clear code"
            >
              Clear
            </Button>
          </div>
        </div>
      </Card>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} md={6}>
          <Card className="shadow-md border-0 h-full">
            <Title level={4}>Templates</Title>
            <Paragraph className="text-gray-600 mb-4">
              Start with a template or create your own code from scratch
            </Paragraph>
            
            <Select
              placeholder="Select a template"
              className="w-full mb-4"
              onChange={handleTemplateChange}
            >
              <Option value="empty">Empty File</Option>
              <Option value="hello_world">Hello World</Option>
              <Option value="variables">Variables</Option>
              <Option value="functions">Functions</Option>
              <Option value="loops">Loops</Option>
            </Select>
            
            <Divider />
            
            <Title level={5}>Tips</Title>
            <ul className="text-sm text-gray-600 list-disc pl-4">
              <li className="mb-1">Use print() to display output</li>
              <li className="mb-1">Indentation matters in Python</li>
              <li className="mb-1">Lines starting with # are comments</li>
              <li className="mb-1">Your code will timeout after 5 seconds</li>
            </ul>
          </Card>
        </Col>
        
        <Col xs={24} md={18}>
          <CodeCompiler 
            initialCode={code} 
            expectedOutput="" 
            readOnly={false} 
          />
        </Col>
      </Row>
    </div>
  );
};

export default CompilerPage;