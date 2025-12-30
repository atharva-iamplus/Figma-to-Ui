import requests
import os

class FigmaFetchAgent:
    def __init__(self, token, file_key):
        self.token = token
        self.file_key = file_key
        self.headers = {"X-Figma-Token": token}

    def fetch_raw_data(self):
        # Fetch the main document
        url = f"https://api.figma.com/v1/files/{self.file_key}"
        response = requests.get(url, headers=self.headers)
        
        if response.status_code != 200:
            print(f"❌ Error: {response.json()}")
            return None
            
        data = response.json()
        
        # Clean the data to save tokens (remove vectors and extra coordinates)
        simplified_doc = self.simplify_node(data['document'])
        
        # Return both the structure and the global styles metadata
        return {
            "document": simplified_doc,
            "styles": data.get("styles", {}),
            "componentSets": data.get("componentSets", {})
        }

    def simplify_node(self, node):
        simplified = {
            "name": node.get("name"),
            "type": node.get("type"),
            "id": node.get("id"),
            "styles": node.get("styles") # Keeps the link to the Token Agent
        }
        if "characters" in node:
            simplified["text"] = node["characters"]
        if "children" in node:
            simplified["children"] = [
                self.simplify_node(c) for c in node["children"] 
                if c.get("type") not in ["VECTOR", "BOOLEAN_OPERATION"]
            ]
        return simplified