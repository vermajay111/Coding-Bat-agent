import requests
from datetime import datetime, timezone

def send_solution(id, code, cuname, js_sessionid):
    url = ('https://codingbat.com/run')
    
    headers = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        "Content-Type": "application/x-www-form-urlencoded",
        "Origin": "https://codingbat.com",
        "Referer": "https://codingbat.com/prob/p181646",
        "Priority": "u=0",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:151.0) Gecko/20100101 Firefox/151.0",
    }

    cookies = {
        "JSESSIONID": js_sessionid
    }

    data = {
        "id": id,
        "code": code,
        "cuname": cuname,
        "date":int(datetime.now(timezone.utc).timestamp()),
        "adate": datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%Sz").lower()
    }

    r = requests.post(
        url,
        headers=headers,
        cookies=cookies,
        data=data,
    )

    return r

def get_problem(url):
    r = requests.get(url)
    return r.text

#text = send_solution("p154485", "def hello():\n    return 'Hello, World!'", "jayverma123@gmail.com")