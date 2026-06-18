import requests

def send_solution(id, code, cuname, date, adate):
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
        "JSESSIONID": "30C31BFC3C9E87940D209EBF5198840D"
    }

    data = {
        "id": id,
        "code": code,
        "cuname": cuname,
        "date": date,
        "adate": adate
    }

    r = requests.post(
        url,
        headers=headers,
        cookies=cookies,
        data=data,
    )

    return r