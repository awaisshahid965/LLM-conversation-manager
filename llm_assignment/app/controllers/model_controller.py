from flask import request, jsonify
from ..models.model_loader import ModelLoader, ModelType

class ModelController:
    conversation_contexts = {}

    @staticmethod
    def select_model():
        data = request.json
        user_id = data['user_id']
        model_name = data['model']
        
        try:
            model_type = ModelType[model_name.upper()]
        except KeyError:
            return jsonify({"error": "Invalid model type."}), 400
        
        ModelController.conversation_contexts[user_id] = {'model': model_type, 'history': []}
        return jsonify({"message": f"Model {model_name} selected for user {user_id}."})

    @staticmethod
    def query():
        data = request.json
        user_id = data['user_id']
        question = data['question']
        
        if user_id not in ModelController.conversation_contexts:
            return jsonify({"error": "Model not selected for user."}), 400
        
        model_type = ModelController.conversation_contexts[user_id]['model']
        model = ModelLoader.models[model_type]['model']
        tokenizer = ModelLoader.models[model_type]['tokenizer']
        
        ModelController.conversation_contexts[user_id]['history'].append({"question": question})
        
        # Generate response
        inputs = tokenizer(question, return_tensors='pt')
        outputs = model.generate(**inputs)
        answer = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        ModelController.conversation_contexts[user_id]['history'].append({"answer": answer})
        
        return jsonify({"answer": answer})

    @staticmethod
    def history():
        user_id = request.args.get('user_id')
        if user_id not in ModelController.conversation_contexts:
            return jsonify({"error": "No history found for user."}), 400
        return jsonify(ModelController.conversation_contexts[user_id]['history'])
