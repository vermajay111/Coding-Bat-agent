from request_handler.main import send_solution, get_problem
from html_handler.main import HtmlExtractor
from pathlib import Path

def solve_coding_bat_section(js_sessionid, base_id, email):
        
    def get_solution_by_title(problem_title, answers_path="/home/jayv/Documents/CodingBat.Com-Agent/answers"):
        root = Path(answers_path)

        for file_path in root.rglob("*"):
            if file_path.is_file() and file_path.stem == problem_title:
                return file_path.read_text(encoding="utf-8")

        return None
    
    base_url = "https://codingbat.com/prob/"
    next_id = base_id

    while next_id:
        page_content = get_problem(base_url + next_id)
        html_extractor = HtmlExtractor(page_content)
        solution = get_solution_by_title(html_extractor.extract_coding_bat_problem_title())
        status = send_solution(id=next_id, code=solution, cuname=email, js_sessionid=js_sessionid)
        next_id = html_extractor.extract_next_link()
    
    
    
solve_coding_bat_section(js_sessionid="7B4029F34F3A08CF0405FC2F1800B9C1",
                         base_id="p142270", 
                         email="jayverma123@gmail.com")