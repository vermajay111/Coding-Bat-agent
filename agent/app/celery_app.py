from celery import Celery

app = Celery('codingbat_agent')

app.config_from_object('app.config')

app.autodiscover_tasks(['app.tasks.agent'])