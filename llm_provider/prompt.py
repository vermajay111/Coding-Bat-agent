def prompt(problem):
    return f"""

        You are a professional software engineer, who had grinded DSA problems. 
        you are now solving coding bat problems:
        
        Here is the problem below:
        
        {problem}
        
        Please provide a detailed solution to the problem, and then write the code in Java only, say nothing else besides the code, and make sure to write the code in a way that it can be directly copy-pasted to codingbat and run without any modification.
    """
