from google import genai
from google.genai import types
import json

class UIDecomposeAgent:
    def __init__(self, api_key):
        self.client = genai.Client(api_key=api_key)
        # Update this line to use the latest model
        self.model_id = "gemini-2.5-flash"
 
        
        with open('prompts/ui_decompose.txt', 'r') as f:
            self.system_prompt = f.read()

    def analyze(self, figma_json):
        # We wrap the figma data to ensure it's treated as a single string
        prompt = f"{self.system_prompt}\n\nFigma Data: {json.dumps(figma_json)}"
        
        response = self.client.models.generate_content(
            model=self.model_id,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )
        return json.loads(response.text)