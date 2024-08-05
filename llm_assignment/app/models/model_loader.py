from ctransformers import AutoModelForCausalLM
from ..config import Config
from enum import Enum

class ModelType(Enum):
    LLAMA2 = 'llama2'
    MISTRAL = 'mistral'

class ModelLoader:
    models = {}

    @classmethod
    def load_models(cls):
        cls.models[ModelType.LLAMA2] = AutoModelForCausalLM.from_pretrained(
            Config.LLAMA2_MODEL_NAME,
            model_file=Config.LLAMA2_MODEL_PATH,
            gpu_layers=0
        )
        cls.models[ModelType.MISTRAL] = AutoModelForCausalLM.from_pretrained(
            Config.MISTRAL_MODEL_NAME,
            model_file=Config.MISTRAL_MODEL_PATH,
            gpu_layers=0
        )
