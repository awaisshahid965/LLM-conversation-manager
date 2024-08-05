import os

class Config:
    LLAMA2_MODEL_NAME = os.getenv('LLAMA2_MODEL_NAME', '')
    LLAMA2_MODEL_PATH = os.getenv('LLAMA2_MODEL_PATH', '')
    MISTRAL_MODEL_NAME = os.getenv('MISTRAL_MODEL_NAME', '')
    MISTRAL_MODEL_PATH = os.getenv('MISTRAL_MODEL_PATH', '')
