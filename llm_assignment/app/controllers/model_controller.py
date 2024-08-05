import requests
import os
import logging
from flask import request, jsonify
from ..models.model_loader import ModelLoader, ModelType

logging.basicConfig(level=logging.DEBUG)

class ModelController:
    # Environment variable for the conversation history endpoint
    conversation_endpoint = os.getenv('conversation_endpoint', '')

    @staticmethod
    def get_user_history(user_id):
        try:
            logging.debug(f'{ModelController.conversation_endpoint}/history?user_id={user_id}')
            response = requests.get(f'{ModelController.conversation_endpoint}/history?user_id={user_id}')
            response.raise_for_status()
            data = response.json()
            return data
        except requests.RequestException as e:
            print(f"Error fetching history from API: {e}")
            return []

    @staticmethod
    def query():
        try:
            data = request.json
            
            if not data or 'user_id' not in data or 'question' not in data:
                return jsonify({"error": "Invalid request data."}), 400

            user_id = data['user_id']
            question = data['question']
            
            # Fetch history from API
            history = ModelController.get_user_history(user_id)
            conversation_history = history.get('history', [])

            model_type = ModelType[history.get('model', ModelType.MISTRAL).upper()]
            model = ModelLoader.models[model_type]
            
            # Prepare input with history and current question
            context = "\n".join([f"```Question:``` {turn['question']}\n```Answer:``` {turn.get('answer', '')}" for turn in conversation_history])
            context += f"\n```Question:``` {question}\n```Answer:```"

            # Generate response
            response = model(context, max_new_tokens=250, stream=False)

            # Extract the answer from the response
            answer = "".join(chunk for chunk in response).strip()
            logging.debug(f'answer, {answer}')

            # Ensure the answer only contains the response part
            # Use markers to extract the specific answer part
            if '```Question:```' in answer:
                answer = answer.split('```Question:```', 1)[0].strip()

            # Update conversation history with the model's response
            conversation_history.append({"answer": answer.strip()})

            return jsonify({"answer": answer.strip()})
        except Exception as e:
            logging.error(f'Exception occurred: {e}', exc_info=True)
            return jsonify({"error": str(e)}), 500
