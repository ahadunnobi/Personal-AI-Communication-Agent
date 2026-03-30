from .ai_engine import ai_engine
from ..db.models import PersonalityProfile
import json

class PersonalityEngine:
    async def apply_personality(self, message_content: str, profile: PersonalityProfile, contact_name: str, context_summary: str):
        tone_rules = profile.tone_rules or {}
        samples = profile.sample_messages or []
        
        system_prompt = f"""
        You are an AI assistant acting on behalf of the user. Your name is the user's name.
        Target Personality: {profile.name}
        
        Tone Rules:
        {json.dumps(tone_rules, indent=2)}
        
        Example messages from the user in this style:
        {chr(10).join([f"- {s}" for s in samples])}
        
        Context of the conversation:
        {context_summary}
        
        Constraint: 
        - Do NOT impersonate deceptively. 
        - If asked if you are an AI, be honest but stay in character as an assistant.
        - Be concise and match the user's style perfectly.
        - Reply to: {contact_name}
        """
        
        user_prompt = f"Incoming message: {message_content}\n\nGenerate a perfect reply in the user's style:"
        
        reply = await ai_engine.generate_response(system_prompt, user_prompt, temperature=0.8)
        return reply

personality_engine = PersonalityEngine()
