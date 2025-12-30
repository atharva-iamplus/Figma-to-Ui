import os
import json
from dotenv import load_dotenv

# Import all agents
from agents.figma_fetch import FigmaFetchAgent
from agents.ui_decompose import UIDecomposeAgent
from agents.token_agent import DesignTokenAgent
from agents.component_generator import ComponentGeneratorAgent
from agents.screen_assembly import ScreenAssemblyAgent

def run_pipeline():
    # Load Environment Variables (.env)
    load_dotenv()
    google_key = os.getenv("GOOGLE_API_KEY")
    figma_token = os.getenv("FIGMA_ACCESS_TOKEN")
    figma_key = os.getenv("FIGMA_FILE_KEY")

    if not all([google_key, figma_token, figma_key]):
        print("❌ Error: Missing API keys in .env file.")
        return

    # Initialize Agents
    fetcher = FigmaFetchAgent(figma_token, figma_key)
    decomposer = UIDecomposeAgent(google_key)
    token_agent = DesignTokenAgent(google_key)
    generator = ComponentGeneratorAgent(google_key)
    assembler = ScreenAssemblyAgent(google_key)

    print("🚀 STEP 1: Fetching Figma Data...")
    raw_payload = fetcher.fetch_raw_data()
    if not raw_payload: return

    print("🧠 STEP 2: Decomposing UI Structure...")
    # Simplifies 50+ layers into logical sections (Navbar, Hero, etc.)
    blueprint = decomposer.analyze(raw_payload["document"])

    print("🎨 STEP 3: Extracting Design Tokens (HSL)...")
    # Converts Figma colors/spacing into shadcn-compatible variables
    tokens = token_agent.extract(raw_payload)

    print("💻 STEP 4: Generating Individual Components...")
    # Writes the React code for each block in the blueprint using the tokens
    components_code = generator.generate(blueprint, tokens)

    print("🏗️ STEP 5: Assembling Final Page Layout...")
    # Glues all components together into a responsive Next.js page
    final_page = assembler.assemble(blueprint, components_code, tokens)

    # --- SAVE OUTPUT ---
    output_dir = "output"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Save the Individual Components Library
    with open(f"{output_dir}/components.tsx", "w", encoding="utf-8") as f:
        f.write(components_code)

    # Save the Final Assembled Page
    with open(f"{output_dir}/page.tsx", "w", encoding="utf-8") as f:
        f.write(final_page)

    print(f"\n✨ PIPELINE COMPLETE! ✨")
    print(f"📂 Components: {output_dir}/components.tsx")
    print(f"📂 Full Page:  {output_dir}/page.tsx")

if __name__ == "__main__":
    run_pipeline()