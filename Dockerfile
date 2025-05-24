FROM ubuntu:22.04

# Install dependencies
RUN apt-get update && \
    apt-get install -y curl python3 python3-pip git

# Install Ollama
RUN curl -fsSL https://ollama.com/install.sh | bash

# Copy app code
COPY app /app
WORKDIR /app

# Install Python deps
RUN pip3 install -r requirements.txt

EXPOSE 11434 5000

CMD ollama serve & sleep 5 && ollama pull mistral && ollama run mistral:v0.3 && python3 server.py
