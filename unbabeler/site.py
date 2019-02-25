from flask import (
    Blueprint, render_template, request, jsonify
)
from unbabeler import db, unbabel

bp = Blueprint('site', __name__)

@bp.route('/')
def index():
    """This is the main page"""
    return render_template('site/index.html')

@bp.route('/translate', methods=['POST'])
def translate():
    """Endpoint to enqueue translations"""
    if request.method == 'POST':
        try:
            text = request.get_json()['text']
            translation = unbabel.translate(text)
            db.insert_translation(translation)
            return jsonify({'status': 'ok'})
        except:
            return jsonify({'error': 'Some error'})
    else:
        return 'Method not allowed'

@bp.route('/translations', methods=['GET'])
def translations():
    """Endpoint to get all translations"""
    if request.method == 'GET':
        try:
            translations = db.get_translations()
            return jsonify(translations)
        except:
            return jsonify({'error': 'Some error'})
    else:
        return 'Method not allowed'

@bp.route('/translation/<job_id>', methods=['GET'])
def translation(job_id):
    """Endpoint to get all translations"""
    if request.method == 'GET':
        #try:
            status = unbabel.check_status(job_id)
            updated = db.update_translation(status)
            return jsonify({'updated': updated })
        #except:
        #    return jsonify({'error': 'Some error'})
    else:
        return 'Method not allowed'
