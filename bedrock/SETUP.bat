@REM Run this to set up your environment.

echo "Setup Python"
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
deactivate

echo "Setup Node"
npm install @minecraft/server @minecraft/server-ui @minecraft/vanilla-data
