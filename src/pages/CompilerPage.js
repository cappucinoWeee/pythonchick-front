// src/pages/CompilerPage.js
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Breadcrumb, 
  Row, 
  Col, 
  Button,
  Select,
  Input,
  Divider,
  message,
  Modal,
  Form
} from 'antd';
import { Link } from 'react-router-dom';
import { 
  HomeOutlined, 
  CodeOutlined, 
  SaveOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined
} from '@ant-design/icons';
import CodeCompiler from '../components/compiler/CodeCompiler';
import { useAuth } from '../context/AuthContext';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const CompilerPage = () => {
  const { user } = useAuth();
  const [fileName, setFileName] = useState('untitled.py');
  const [code, setCode] = useState('# Write your Python code here\n\nprint("Hello, World!")\n');
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [saveForm] = Form.useForm();
  const [savedSnippets, setSavedSnippets] = useState([]);
  
  // Template options for the Python code
  const templates = {
    empty: '# Write your Python code here\n',
    hello_world: '# Simple Hello World program\n\nprint("Hello, World!")\n',
    variables: '# Variables and data types\n\nname = "Alice"\nage = 25\nheight = 1.75\n\nprint(f"Name: {name}")\nprint(f"Age: {age}")\nprint(f"Height: {height} meters")\n',
    functions: '# Function example\n\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Python"))\n',
    loops: '# Loop example\n\nfruits = ["apple", "banana", "cherry"]\n\nfor fruit in fruits:\n    print(f"I like {fruit}s")\n\nfor i in range(5):\n    print(f"Number: {i}")\n',
    conditionals: '# Conditional statements\n\nage = 18\n\nif age < 13:\n    print("Child")\nelif age < 18:\n    print("Teenager")\nelse:\n    print("Adult")\n',
    lists: '# Working with lists\n\nnumbers = [1, 2, 3, 4, 5]\n\n# Add to the list\nnumbers.append(6)\n\n# Sum all numbers\ntotal = sum(numbers)\n\nprint(f"Numbers: {numbers}")\nprint(f"Total: {total}")\n',
  };
  
  // Handle template selection
  const handleTemplateChange = (template) => {
    setCode(templates[template]);
    message.info(`${template.replace('_', ' ')} template loaded`);
  };
  
  // Handle saving code
  const handleSaveCode = () => {
    setSaveModalVisible(true);
    saveForm.setFieldsValue({
      title: fileName.replace('.py', ''),
      description: ''
    });
  };
  
  // Handle download code
  const handleDownloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    message.success(`Code downloaded as ${fileName}`);
  };
  
  // Handle copy code to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    message.success('Code copied to clipboard!');
  };
  
  // Handle submission of the save modal
  const handleSaveConfirm = () => {
    saveForm.validateFields()
      .then(values => {
        // In a real app, you'd call an API to save this
        const newSnippet = {
          id: Date.now().toString(),
          title: values.title,
          description: values.description,
          code,
          createdAt: new Date().toISOString()
        };
        
        setSavedSnippets([...savedSnippets, newSnippet]);
        setSaveModalVisible(false);
        saveForm.resetFields();
        setFileName(`${values.title}.py`);
        message.success('Code saved successfully!');
      })
      .catch(errorInfo => {
        console.log('Validation failed:', errorInfo);
      });
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
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <Title level={2}>Python Code Compiler</Title>
            <Paragraph className="text-gray-600">
              Write, run and test your Python code in real-time
            </Paragraph>
          </div>
          
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <Input 
              placeholder="File name" 
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              style={{ width: 200 }}
              suffix=".py"
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
              onClick={() => {
                setCode(templates.empty);
                message.info('Code cleared');
              }}
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
              <Option value="conditionals">Conditionals</Option>
              <Option value="lists">Lists</Option>
            </Select>
            
            <Divider />
            
            <Title level={5}>Tips</Title>
            <ul className="text-sm text-gray-600 list-disc pl-4">
              <li className="mb-1">Use print() to display output</li>
              <li className="mb-1">Indentation matters in Python</li>
              <li className="mb-1">Lines starting with # are comments</li>
              <li className="mb-1">Your code will timeout after 5 seconds</li>
              <li className="mb-1">Use the Run button to execute your code</li>
            </ul>
            
            {savedSnippets.length > 0 && (
              <>
                <Divider />
                
                <Title level={5}>Saved Snippets</Title>
                <div className="max-h-60 overflow-y-auto">
                  {savedSnippets.map(snippet => (
                    <div 
                      key={snippet.id} 
                      className="p-3 border rounded-lg mb-2 cursor-pointer hover:bg-gray-50"
                      onClick={() => {
                        setCode(snippet.code);
                        setFileName(`${snippet.title}.py`);
                        message.info(`Loaded: ${snippet.title}`);
                      }}
                    >
                      <div className="font-medium">{snippet.title}</div>
                      {snippet.description && (
                        <div className="text-xs text-gray-500 truncate">{snippet.description}</div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </Card>
        </Col>
        
        <Col xs={24} md={18}>
          <CodeCompiler 
            initialCode={code}
            expectedOutput=""
            readOnly={false}
            onSuccess={() => {}}
            onError={() => {}}
            title="Python Code"
          />
        </Col>
      </Row>
      
      {/* Save Code Modal */}
      <Modal
        title="Save Code"
        open={saveModalVisible}
        onOk={handleSaveConfirm}
        onCancel={() => setSaveModalVisible(false)}
        okText="Save"
        cancelText="Cancel"
      >
        <Form
          form={saveForm}
          layout="vertical"
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title for your code' }]}
          >
            <Input placeholder="Enter a title for your code" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Description (optional)"
          >
            <Input.TextArea 
              placeholder="Enter a description (optional)"
              rows={3}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CompilerPage;