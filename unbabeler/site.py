from flask import (
    Blueprint, render_template
)

bp = Blueprint('site', __name__)

@bp.route('/')
def index():
    """This is the main page"""
    return render_template('site/index.html')
