import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Input from '../components/shared/Input';
import Button from '../components/shared/Button';
import Select from '../components/shared/Select';
import { useChat } from '../hooks/useChat';

const Chat: React.FC = () => {
  const [question, setQuestion] = useState('');
  const { messages, messageSubmitting, sendMessage, clearMessages } = useChat();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user_id = searchParams.get('user_id') ?? ''
  const model = searchParams.get('model') ?? ''

  useEffect(() => {
    if(!model || !user_id) {
      navigate('/')
    }
  }, []);

  const handleSend = async () => {
    await sendMessage(question, user_id);
    setQuestion('');
  };

  const handleChangeModel = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const model = e.target.value;
    await fetch(`${process.env.REACT_APP_API_URL}/select_model`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, user_id })
    });
    clearMessages();
    navigate(`/chat?model=${model}&user_id=${user_id}`);
  };

  const handleClearMessages = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/select_model`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, user_id })
    });
    clearMessages();
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex w-full justify-center gap-8 p-4">
        <Select
          options={[
            { value: 'llama2', label: 'Llama2' },
            { value: 'mistral', label: 'Mistral' }
          ]}
          onChange={handleChangeModel}
          className="w-1/3"
          value={model}
        />
        <Button onClick={handleClearMessages}>Clear Chat</Button>
        <Button onClick={() => navigate('/')}>Go To Home Screen</Button>
      </div>
      <div className="flex flex-col flex-grow items-center w-full p-4 overflow-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className="w-full p-2 my-2 bg-gray-200 rounded">
            <p><strong>Q:</strong> {msg.question}</p>
            <p><strong>A:</strong> {msg.answer === '...' ? <div className="loader"></div> : msg.answer}</p>
          </div>
        ))}
      </div>
      <div className="flex w-full p-4">
        <Input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question"
          className="flex-grow mr-4"
        />
        <Button onClick={handleSend} disabled={messageSubmitting} className={messageSubmitting ? 'opacity-70' : ''}>Ask</Button>
      </div>
    </div>
  );
};

export default Chat;
