from flask import Flask
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

@app.route('/')
def index():
    return "LLM Assignment Server is running!"

if __name__ == '__main__':
    port = int(os.getenv("PYTHON_PORT", 5000))
    debug_mode = os.getenv("FLASK_ENV") == "development"
    app.run(host='0.0.0.0', port=port, debug=debug_mode)
