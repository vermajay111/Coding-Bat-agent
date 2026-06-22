from services.agent.main import solve_coding_bat_section
from app.celery_app import app
from celery import Task


class CodingBatAgentTask(Task):
    name = "agent.codingbat_agent"
    autoretry_for = (Exception,)
    retry_kwargs = {"max_retries": 3, "countdown": 10}
    retry_backoff = True
    retry_jitter = True

    def run(self, js_sessionid, base_id, email):
        return solve_coding_bat_section(js_sessionid, base_id, email)


app.register_task(CodingBatAgentTask())