import os
import json
from google import genai

class ComponentGeneratorAgent:
    def __init__(self, api_key):
        # Initialize the latest GenAI client for 2025
        self.client = genai.Client(api_key=api_key)
        self.model_id = "gemini-2.5-flash"
        
        # Load your specific shadcn-focused prompt
        prompt_path = os.path.join('prompts', 'component_generator.txt')
        with open(prompt_path, 'r') as f:
            self.system_prompt = f.read()

    def generate(self, blueprint, tokens):
        """
        Takes the UI Blueprint and Design Tokens to create shadcn components.
        """
        # We wrap the inputs in a clear context for the AI
        user_context = {
            "ui_blueprint": blueprint,
            "design_tokens": tokens
        }

        # Request generation with System Instructions
        response = self.client.models.generate_content(
            model=self.model_id,
            config={
                "system_instruction": self.system_prompt,
                "response_mime_type": "text/plain" # Or "application/json" if you want structured output
            },
            contents=f"Generate the components for this data: {json.dumps(user_context)}"
        )

        return response.text