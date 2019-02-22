import click
import sqlalchemy

from flask import current_app, g
from flask.cli import with_appcontext
from sqlalchemy import Table, Column, Integer, String, Enum

def get_db():
    """Connect to the application's configured db."""
    if 'db' not in g:
        url = 'postgresql://admin:admin@localhost:5432/site'
        con = sqlalchemy.create_engine(url, client_encoding='utf8')
        meta = sqlalchemy.MetaData(bind=con, reflect=True)
        g.db = con

    return con, meta

def close_db(e=None):
    """Close database connection."""
    db = g.pop('db', None)

def init_db():
    """Clear existing data and create new tables"""
    con, meta = get_db()

    translations = Table('translations', meta,
        Column('id', Integer, primary_key=True, autoincrement=True),
        Column('text_source', String),
        Column('target_source', String),
        Column('job_id', String),
        Column('status', Enum('requested', 'pending', 'translated', name='status_enum'))
    )

    meta.create_all(con)


    # with current_app.open_resource('schema.sql') as f:
    #     db.executescript(f.read().decode('utf8'))

@click.command('init_db')
@with_appcontext
def init_db_command():
    init_db()
    click.echo('DB Ok.')

def init_app(app):
    """Register database functions with the flask app."""
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
