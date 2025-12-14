import os
from PIL import Image
import torch
from transformers import TrOCRProcessor, VisionEncoderDecoderModel
import io
from typing import List, Union

class OCRService:
    def __init__(self):
        self.processor = None
        self.model = None
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        # Use a smaller model for faster inference on local machines, or 'base' for better accuracy
        # microsoft/trocr-small-handwritten or microsoft/trocr-base-handwritten
        self.model_name = "microsoft/trocr-base-handwritten" 

    def _load_model(self):
        """Lazy load the model only when needed."""
        if self.model is None:
            print(f"Loading OCR model: {self.model_name} on {self.device}...")
            try:
                self.processor = TrOCRProcessor.from_pretrained(self.model_name)
                self.model = VisionEncoderDecoderModel.from_pretrained(self.model_name).to(self.device)
                print("OCR Model loaded successfully.")
            except Exception as e:
                print(f"Error loading OCR model: {e}")
                raise e

    def digitize_image(self, image_input: Union[str, bytes, Image.Image]) -> str:
        """
        Takes an image path, bytes, or PIL Image and returns the recognized text.
        """
        self._load_model()
        
        try:
            if isinstance(image_input, str):
                image = Image.open(image_input).convert("RGB")
            elif isinstance(image_input, bytes):
                image = Image.open(io.BytesIO(image_input)).convert("RGB")
            elif isinstance(image_input, Image.Image):
                image = image_input.convert("RGB")
            else:
                raise ValueError("Invalid image input format")

            # Preprocess
            pixel_values = self.processor(images=image, return_tensors="pt").pixel_values.to(self.device)

            # Generate
            generated_ids = self.model.generate(pixel_values, max_new_tokens=100) # Adjust tokens as needed
            generated_text = self.processor.batch_decode(generated_ids, skip_special_tokens=True)[0]

            return generated_text

        except Exception as e:
            print(f"Error during digitization: {e}")
            return f"[Error digitizing content: {str(e)}]"

ocr_service = OCRService()
