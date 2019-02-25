import pytest

def test_index(client):
    response = client.get('/')
    assert b"<div id=\"app\"></div>" in response.data

def test_translate(client):
    response = client.get('/translate')
    assert response.status_code == 405

def test_translations(client):
    response = client.post('/translations')
    assert response.status_code == 405

def test_translate(client):
    response = client.post('/translation/1245')
    assert response.status_code == 405
