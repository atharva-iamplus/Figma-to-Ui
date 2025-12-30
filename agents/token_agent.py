from google import genai
import json

class DesignTokenAgent:
    def __init__(self, api_key):
        self.client = genai.Client(api_key=api_key)
        self.model_id = "gemini-2.5-flash"

    def extract(self, raw_data):
        prompt = """
        Extract Design Tokens for a shadcn/ui theme from this Figma data.
        Return ONLY a JSON object with:
        - "colors": { "primary": "HSL", "secondary": "HSL", "background": "HSL" }
        - "radius": "string (rem)"
        """
        
        # Use the config parameter to enforce JSON mode
        response = self.client.models.generate_content(
            model=self.model_id,
            contents=f"{prompt}\n\nData: {json.dumps(raw_data)[:5000]}",
            config={
                "response_mime_type": "application/json" # This fixes the error!
            }
        )
        
        # Now response.text will be a clean JSON string
        return json.loads(response.text)