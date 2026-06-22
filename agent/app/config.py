broker_url = "amqp://guest:guest@localhost:5672//"
result_backend = "redis://localhost:6379/0"  


task_serializer = "json"
accept_content = ["json"]
result_serializer = "json"

timezone = "UTC"
enable_utc = True

task_routes = {
    'agent.codingbat_agent': {
        'queue': 'codingbat_problemsolver_queue'
    },
}


result_expires = 120