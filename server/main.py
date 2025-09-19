from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prisma import Prisma
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()
db = Prisma()

origins = [
    "http://localhost",
    "http://localhost:8081", # Default Expo port
    "exp://localhost:8081",
    os.getenv("EXPO_APP_URL"), # For connecting to the app on a device
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await db.connect()

@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()

@app.get("/users")
async def get_users():
    users = await db.user.find_many()
    return {"users": users}

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Blaze Neuro Mobile API!"}
