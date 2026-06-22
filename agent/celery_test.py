from app.celery_app import app
import json


app.send_task(
    'agent.codingbat_agent', 
    args=["C4A8B1EC6F6B9062DFCBD19C43E58E35", 
          "p171896",
          "jayverma123@gmail.com",
          "job_12345"],
    queue='codingbat_problemsolver_queue' 
) 

