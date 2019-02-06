from flask import Flask

def create_app():
    app = Flask(__name__, instance_relative_config=True)

    @app.route('/help')
    def help():
        return 'You are on your own, man!'

    from unbabeler import site
    app.register_blueprint(site.bp)

    return app
