import ollama
from .prompt import prompt

def ollama_nemtron_3_request(prompt):
    response = ollama.chat(
        model='nemotron-3-nano:30b-cloud',
        messages=[
            {
                'role': 'user',
                'content': prompt
            }
        ]
    )


    return (response.message.content)
