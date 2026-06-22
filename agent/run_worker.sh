export PYTHONPATH=$(pwd)
celery -A app.celery_app worker -Q codingbat_problemsolver_queue -l info -n codingbat_agent@%h