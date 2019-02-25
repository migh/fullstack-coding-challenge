import requests

url = 'https://sandbox.unbabel.com/tapi/v2/translation'
headers = {
    'Authorization': 'ApiKey fullstack-challenge:9db71b322d43a6ac0f681784ebdcc6409bb83359',
    'Content-Type': 'application/json'
}

def get_translate_data(text):
    return { 'text': text,
            'source_language': 'en',
            'target_language': 'es',
            'text_format': 'text' }

def translate(text):
    data = get_translate_data(text)
    r = requests.post(url, headers=headers, json=data)
    return r.json()

def check_status(job_id):
    r = requests.get(url + '/' + job_id, headers=headers)
    return r.json()
