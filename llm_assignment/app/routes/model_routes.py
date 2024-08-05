from flask import Blueprint
from ..controllers.model_controller import ModelController

bp = Blueprint('model', __name__)

bp.add_url_rule('/query', view_func=ModelController.query, methods=['POST'])
