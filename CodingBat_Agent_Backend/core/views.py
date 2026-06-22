from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from .celery_client import celery_app

@api_view(['POST'])
def send_request_to_agent(request):
    js_sessionid = request.data.get("js_sessionid")
    email = request.data.get("email")
    start_id = request.data.get("start_id")
    task = celery_app.send_task(
    'agent.codingbat_agent', 
    args=[js_sessionid, start_id, email],
    queue='codingbat_problemsolver_queue' 
    ) 
    
    return Response({"message": "Request received successfully", "task_id": task.id})

@api_view(['POST'])
def check_agent_status(request):
    task_id = request.data.get("job_id")
    
    if not task_id:
        return Response({"error": "No task id provided"})
    
    task = celery_app.AsyncResult(task_id)
    state = task.state
    
    if state == "PENDING":
        return Response({"status": "pending"})
    if state == "FAILURE":
        return Response({"status": "Task failed to complete"}, status=500)
    if state == "SUCCESS":
        return Response({"status": "Task completed"}, status=200)
    
    return Response({"error": "error ocurred in system please try again"})