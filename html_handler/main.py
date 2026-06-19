from bs4 import BeautifulSoup
from pathlib import Path

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
        
