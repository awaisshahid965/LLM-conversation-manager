from app import create_app
import os

app = create_app()

if __name__ == '__main__':
    port = int(os.getenv("PYTHON_PORT", 5000))
    debug_mode = os.getenv("FLASK_ENV") == "development"
    app.run(host='0.0.0.0', port=port, debug=debug_mode)
