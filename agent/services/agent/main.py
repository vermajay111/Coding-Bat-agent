from pathlib import Path
from bs4 import BeautifulSoup
from pathlib import Path
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

class HtmlExtractor:
    
    def __init__(self, html):
        self.soup = BeautifulSoup(html, 'html.parser')

    def extract_next_link(self):

        next_button = self.soup.find('a', string='next')
        if next_button:
            next_id = next_button.get('href')
            if next_id.startswith("/prob/"):
                next_id = next_id[len("/prob/"):]
                
            return next_id
        else:
            return None


    def get_codingbat_problem(self):
        
        problem = self.soup.find('p', class_='max2')
        if problem:
            problem_text = problem.get_text(strip=True)
            return problem_text
        else:
            raise ValueError("No problem found")


    def extract_coding_bat_problem_title(self):
        
        title_element = self.soup.find_all('span', class_='h2')[1]
        if title_element:
            return title_element.get_text(strip=True)
        else:
            raise ValueError("No title found")

def solve_coding_bat_section(js_sessionid, base_id, email):
        
    def get_solution_by_title(problem_title, answers_path="/home/jayv/Documents/CodingBat.Com-Agent/agent/services/agent/answers"):
        root = Path(answers_path)

        for file_path in root.rglob("*"):
            if file_path.is_file() and file_path.stem == problem_title:
                return file_path.read_text(encoding="utf-8")

        return None
    
    base_url = "https://codingbat.com/prob/"
    next_id = base_id

    while next_id:
        page_content = requests.get(base_url + next_id).text
        html_extractor = HtmlExtractor(page_content)
        solution = get_solution_by_title(html_extractor.extract_coding_bat_problem_title())
        send_solution(id=next_id, code=solution, cuname=email, js_sessionid=js_sessionid)
        next_id = html_extractor.extract_next_link()
    
    return {"status": "completed"}