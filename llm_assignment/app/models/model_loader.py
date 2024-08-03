from transformers import AutoModelForCausalLM, AutoTokenizer
from ..config import Config
from enum import Enum

class ModelType(Enum):
    LLAMA2 = 'llama2'
    MISTRAL = 'mistral'

class ModelLoader:
    models = {}
    
    @classmethod
    def load_models(cls):
        cls.models[ModelType.LLAMA2] = {
            'model': AutoModelForCausalLM.from_pretrained(Config.LLAMA2_MODEL_PATH),
            'tokenizer': AutoTokenizer.from_pretrained(Config.LLAMA2_TOKENIZER_PATH)
        }
        cls.models[ModelType.MISTRAL] = {
            'model': AutoModelForCausalLM.from_pretrained(Config.MISTRAL_MODEL_PATH),
            'tokenizer': AutoTokenizer.from_pretrained(Config.MISTRAL_TOKENIZER_PATH)
        }
