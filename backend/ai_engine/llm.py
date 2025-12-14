import requests
import json
import os
from typing import Dict, Any, Optional
from starlette.concurrency import run_in_threadpool

import google.generativeai as genai
from google.api_core import exceptions as google_exceptions

class LLMProvider:
    def generate(self, prompt: str, system_prompt: str = "") -> str:
        raise NotImplementedError

    async def agenerate(self, prompt: str, system_prompt: str = "") -> str:
        return await run_in_threadpool(self.generate, prompt, system_prompt)

class GeminiProvider(LLMProvider):
    def __init__(self):
        self.api_keys = [
            "AIzaSyDc_p3iZpLfJCwgujSQzMDExDIMLtAkSBk",
            "AIzaSyDjdnMFjY6pacj93s9UrLPofiZ2OV4bPIw",
            "AIzaSyAOGwxsSiyxLUmdiVvkVFpf7Ruv3OPFnrc"
        ]
        self.current_key_index = 0
        self.model_name = "gemini-2.5-flash"

    def _get_current_key(self):
        return self.api_keys[self.current_key_index]

    def _rotate_key(self):
        self.current_key_index = (self.current_key_index + 1) % len(self.api_keys)
        print(f"Switching to API Key Index: {self.current_key_index}")

    def generate(self, prompt: str, system_prompt: str = "") -> str:
        attempts = 0
        max_attempts = len(self.api_keys)

        while attempts < max_attempts:
            try:
                current_key = self._get_current_key()
                genai.configure(api_key=current_key)
                
                # Configure generation config
                generation_config = genai.types.GenerationConfig(
                    candidate_count=1,
                    temperature=0.7,
                )
                
                model = genai.GenerativeModel(self.model_name)
                
                full_prompt = prompt
                if system_prompt:
                    # Gemini often handles system instructions better if integrated or using the system_instruction param (start w simple prompt append)
                    # For simple compatibility, we'll append.
                    # Ideally, we should use system_instruction in GenerativeModel constructor if supported by the library version,
                    # but simple prompting works for now.
                     model = genai.GenerativeModel(
                        self.model_name,
                        system_instruction=system_prompt
                    )

                response = model.generate_content(prompt, generation_config=generation_config)
                return response.text
            
            except Exception as e:
                print(f"Error with key index {self.current_key_index}: {e}")
                self._rotate_key()
                attempts += 1
        
        return "Error: All API keys failed to generate content."

class OllamaProvider(LLMProvider):
    def __init__(self, model: str = "llama3", host: str = "http://localhost:11434"):
        self.model = model
        self.host = host

    def generate(self, prompt: str, system_prompt: str = "") -> str:
        url = f"{self.host}/api/generate"
        
        full_prompt = prompt
        if system_prompt:
            full_prompt = f"System: {system_prompt}\n\nUser: {prompt}"

        payload = {
            "model": self.model,
            "prompt": full_prompt,
            "stream": False,
            "options": {
                "temperature": 0.7
            }
        }

        try:
            response = requests.post(url, json=payload)
            response.raise_for_status()
            data = response.json()
            return data.get("response", "")
        except requests.exceptions.RequestException as e:
            print(f"Ollama Error: {e}")
            return f"Error generating content: {str(e)}"

# Factory
def get_llm_provider() -> LLMProvider:
    # Switched to GeminiProvider
    return GeminiProvider()
