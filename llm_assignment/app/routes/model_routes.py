from flask import Blueprint
from ..controllers.model_controller import ModelController

bp = Blueprint('model', __name__)

bp.add_url_rule('/select_model', view_func=ModelController.select_model, methods=['POST'])
bp.add_url_rule('/query', view_func=ModelController.query, methods=['POST'])
bp.add_url_rule('/history', view_func=ModelController.history, methods=['GET'])
