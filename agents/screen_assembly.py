import os
import json
from google import genai

class ScreenAssemblyAgent:
    def __init__(self, api_key):
        self.client = genai.Client(api_key=api_key)
        self.model_id = "gemini-2.5-flash"
        
        # Load the assembly prompt
        prompt_path = os.path.join('prompts', 'screen_assembly.txt')
        with open(prompt_path, 'r') as f:
            self.system_prompt = f.read()

    def assemble(self, blueprint, components_code, tokens):
        """
        Final step: Takes all generated assets and creates the full Page.
        """
        user_context = {
            "blueprint": blueprint,
            "components_source": components_code,
            "design_tokens": tokens
        }

        response = self.client.models.generate_content(
            model=self.model_id,
            config={
                "system_instruction": self.system_prompt,
                "response_mime_type": "text/plain" # We want a .tsx file string
            },
            contents=f"Assemble the final page based on this data: {json.dumps(user_context)}"
        )

        return response.text