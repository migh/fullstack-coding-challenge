from flask import Flask

def create_app():
    app = Flask(__name__, instance_relative_config=True)

    # More keep-alive endpoint than actual help
    @app.route('/help')
    def help():
        return 'You are on your own, man!'

    # Register the database
    from unbabeler import db
    db.init_app(app)

    # Apply the blueprints to the app
    from unbabeler import site
    app.register_blueprint(site.bp)

    return app
