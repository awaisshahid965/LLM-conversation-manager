from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from .routes.model_routes import bp as model_bp
from .models.model_loader import ModelLoader

load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    app.register_blueprint(model_bp, url_prefix='/api/ai')
    
    # Load models
    ModelLoader.load_models()
    
    @app.route('/')
    def index():
        return "LLM Assignment Server is running!!"

    return app
