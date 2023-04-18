from fastapi import FastAPI, Form, Request , File, UploadFile, WebSocket
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.responses import StreamingResponse
from requests import request
import speech_recognition as sr
from googletrans import Translator
from gtts import gTTS
import numpy as np
import os
import sys
import msvcrt
import pygame
import uvicorn


app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/audio.html")
async def audio(request: Request):
    return templates.TemplateResponse("audio.html", {"request": request})


Input_language = {"Arabic":"ar-ae","Assamese":"as",
                "Chinese":"zh-cn","Dutch":"nl-nl",
                "English":"en-us","French":"fr",
                "Gujarati":"gu","Hindi":"hi",
                "Indonesian":"id","Japanese":"ja",
                "Bangla":"bn","Nepali":"ne"}
Output_language = {"Arabic":"ar","Assamese":"as",
                "Chinese":"zh","Dutch":"nl",
                "English":"en","French":"fr",
                "Gujarati":"gu","Hindi":"hi",
                "Indonesian":"id","Japanese":"ja",
                "Bangla":"bn","Nepali":"ne"}

@app.post("/audio.html")
async def audio(request: Request, a: str = Form(), b: str = Form()):
    r= sr.Recognizer()
    a = a.title()
    b = b.title()
    with sr.Microphone() as Source:  
        r.adjust_for_ambient_noise(Source, duration=0.2)
        audio2 = r.listen(Source)
    audio.MyText = r.recognize_google( Source, language =Input_language[a])
    audio.MyText = audio.MyText.lower()
    print("yes")
    return audio.MyText
