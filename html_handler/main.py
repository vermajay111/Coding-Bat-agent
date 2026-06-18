from bs4 import BeautifulSoup

def get_codingbat_problem(html):
    soup  = BeautifulSoup(html, 'html.parser')
    problem = soup.find('p', class_='max2')
    if problem:
        problem_text = problem.get_text(strip=True)
        return problem_text
    else:
        raise ValueError("No problem found")

problem = get_codingbat_problem(r.text)
