export const selectModel = async (name: string, model: string) => {
    const response = await fetch('/api/select_model', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, model })
    });
    return response.ok;
  };

  export const askQuestion = async (question: string) => {
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    const data = await response.json();
    return data;
};
  