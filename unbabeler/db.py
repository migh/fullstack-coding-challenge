import click
import sqlalchemy

from flask import current_app, g
from flask.cli import with_appcontext
from sqlalchemy import Table, Column, Integer, String, Enum

def insert_translation(translation):
    """Insert a translation into db."""
    con, meta = get_db()
    translations = meta.tables['translations']
    clause = translations.insert().values(
            text_source=translation['text'],
            job_id=translation['uid'],
            status='requested')

    con.execute(clause)

def update_translation(translationStatus):
    """Update a translation into db."""
    con, meta = get_db()
    status = translationStatus['status']

    translations = meta.tables['translations']
    translationQuery = translations.select().\
        where(translations.c.job_id == translationStatus['uid'])
    translation = con.execute(translationQuery).first()

    if status == translation['status']:
        return False
    else:
        if status == 'completed':
            clause = translations.update().\
                values(status='completed',
                text_target=translationStatus['translatedText']).\
                where(translations.c.job_id == translationStatus['uid'])
        else:
            clause = translations.update().\
                values(status='pending').\
                where(translations.c.job_id == translationStatus['uid'])

        con.execute(clause)
        return True

def get_translations():
    """Get translation from db."""
    con, meta = get_db()
    translations = meta.tables['translations']
    rows = con.execute(translations.select())

    return [{
        'id': row['id'],
        'textSource': row['text_source'],
        'textTarget': row['text_target'],
        'jobId': row['job_id'],
        'status': row['status'] } for row in rows]

def get_db():
    """Connect to the application's configured db."""
    if 'db' not in g:
        url = 'postgresql://admin:admin@localhost:5432/site'
        con = sqlalchemy.create_engine(url, client_encoding='utf8')
        meta = sqlalchemy.MetaData(bind=con, reflect=True)
        g.db = (con, meta)

    return g.db

def close_db(e=None):
    """Close database connection."""
    db = g.pop('db', None)

def init_db():
    """Clear existing data and create new tables"""
    con, meta = get_db()

    translations = Table('translations', meta,
        Column('id', Integer, primary_key=True, autoincrement=True),
        Column('text_source', String),
        Column('text_target', String),
        Column('job_id', String),
        Column('status', Enum('requested', 'pending', 'completed', name='status_enum'))
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
