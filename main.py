from fastapi import FastAPI, Form, Request , File, UploadFile
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.responses import StreamingResponse
from requests import request
import speech_recognition as sr
from googletrans import Translator
from gtts import gTTS
import os
import sys
import msvcrt
import pygame

app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def input(request: Request):
    return templates.TemplateResponse("input.html", {"request": request})

@app.get("/index.html")
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/first.html")
async def first(request: Request):
    return templates.TemplateResponse("first.html", {"request": request})

@app.get("/second.html")
async def second(request: Request):
    return templates.TemplateResponse("second.html", {"request": request})

@app.get("/third.html")
async def third(request: Request):
    return templates.TemplateResponse("third.html", {"request": request})

@app.get("/example.html")
async def example(request: Request):
    return templates.TemplateResponse("example.html", {"request": request})


@app.get("/form.html")
async def form(request: Request):
    return templates.TemplateResponse("form.html", {"request": request})

@app.get("/fourth.html")
async def fourth(request: Request):
    return templates.TemplateResponse("fourth.html", {"request": request})

@app.get("/lang.html")
async def lang(request: Request):
    return templates.TemplateResponse("lang.html", {"request": request})

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

@app.post("/submit")
async def submit(request: Request, a: str = Form(), b: str = Form()):
    r= sr.Recognizer()
    a = a.title()
    b = b.title()

    with sr.Microphone() as Source:  
        r.adjust_for_ambient_noise(Source, duration=0.2)
        audio2 = r.listen(Source)
        submit.MyText = r.recognize_google(audio2, language =Input_language[a])
        submit.MyText = submit.MyText.lower()
        print(submit.MyText)
        return submit.MyText


@app.post("/translate")
async def translate( b: str = Form()):
    b = b.title()
    translator = Translator()
    translate.translation = translator.translate(submit.MyText, dest=Output_language[b])
    translate.translated = translate.translation.text
    print(translate.translated)
    print(translate.translation.text)
    return translate.translated

@app.post("/Store")
async def store(b: str = Form()):
    b = b.title()
    with open("caption.txt","w",encoding="utf8") as file:
        file.write(f'{translate.translated}')
        file.close()
    Myobj = gTTS(text = translate.translated, lang =Output_language[b],slow = False)
    Myobj.save("C:\\SIH\\venv\\audio\\Example.mp3")
    pygame.mixer.init()
    pygame.mixer.music.load("C:\\SIH\\venv\\audio\\Example.mp3")
    pygame.mixer.music.play()
    return FileResponse("C:\\SIH\\venv\\caption.txt",media_type="text/plain")
 
@app.get("/pdf")
def Download():
    with open("C:\\SIH\\venv\\caption.txt", mode="r",encoding="utf8") as file_like:
        yield from file_like
    return StreamingResponse(Download(), media_type="text/plain")

@app.get("/speak")
def speak(request:Request):
    pygame.mixer.init()
    pygame.mixer.music.load("C:\\SIH\\venv\\audio\\Example.mp3")
    pygame.mixer.music.play() 
    return templates.TemplateResponse("audio.html", {"request": request})





