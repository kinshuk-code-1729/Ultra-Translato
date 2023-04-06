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