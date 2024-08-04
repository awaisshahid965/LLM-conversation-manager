import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/shared/Input';
import Button from '../components/shared/Button';
import Select from '../components/shared/Select';

const Home: React.FC = () => {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const navigate = useNavigate();

  const handleContinue = async () => {
    try {
      
      if(!name || !model) {
        return;
      }
      const response = await fetch(`${process.env.REACT_APP_API_URL}/select_model`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: name, model })
      });
      if (response.ok) {
        navigate(`/chat?model=${model}&user_id=${name}`);
      } else {
        alert('Error selecting model');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen space-y-4">
      <div className='bg-[#f4f4f4] px-12 py-32 flex gap-6 flex-wrap justify-center shadow-md max-w-[800px]'>
        <h1 className='text-2xl text-center w-full'>
            Welcome to AI Chat Bot
        </h1>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
        <Select
            options={[
            { value: 'llama2', label: 'Llama2' },
            { value: 'mistral', label: 'Mistral' }
            ]}
            value={model}
            onChange={(e) => setModel(e.target.value)}
        />
        <Button onClick={handleContinue}>Continue</Button>
      </div>
    </div>
  );
};

export default Home;
