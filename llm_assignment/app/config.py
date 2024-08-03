import os

class Config:
    LLAMA2_MODEL_PATH = os.getenv('LLAMA2_MODEL_PATH', 'path_to_llama2_model')
    LLAMA2_TOKENIZER_PATH = os.getenv('LLAMA2_TOKENIZER_PATH', 'path_to_llama2_tokenizer')
    MISTRAL_MODEL_PATH = os.getenv('MISTRAL_MODEL_PATH', 'path_to_mistral_model')
    MISTRAL_TOKENIZER_PATH = os.getenv('MISTRAL_TOKENIZER_PATH', 'path_to_mistral_tokenizer')
