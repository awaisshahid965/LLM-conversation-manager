FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

RUN echo 'watchmedo auto-restart --patterns="*.py" --recursive -- python app.py' > /watch.sh
RUN chmod +x /watch.sh

CMD ["python", "app.py"]
