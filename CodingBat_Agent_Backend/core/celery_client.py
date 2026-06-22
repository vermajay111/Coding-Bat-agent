from celery import Celery

celery_app = Celery(
    'drf_client',
    broker="amqp://guest:guest@localhost:5672//",
    backend="redis://localhost:6379/0"   
)