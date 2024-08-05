# Distributed LLM Assignment

This project consists of a distributed system for managing LLM (Large Language Model) assignments, including a Python server, a Node.js server, and a React frontend. The system leverages Docker for containerization and requires models from Hugging Face for functionality.

## Prerequisites

- Docker
- Docker Compose
- Make (optional, for using the Makefile commands)

## Getting Started

### 1. Download Models

First, download the required models from Hugging Face and place them in the `llm_assignment/models` directory. These models are necessary for the chat functionality.

- [Mistral-7B-Instruct-v0.1-GGUF](https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.1-GGUF/blob/main/mistral-7b-instruct-v0.1.Q4_K_M.gguf)
- [Llama-2-7B-Chat-GGUF](https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/blob/main/llama-2-7b-chat.Q5_K_M.gguf)

```sh
# Open models directory
cd llm_assignment/models

# Move the downloaded model files into the models directory
mv <path_to_downloaded_models>/mistral-7b-instruct-v0.1.Q4_K_M.gguf llm_assignment/models/
mv <path_to_downloaded_models>/llama-2-7b-chat.Q5_K_M.gguf llm_assignment/models/


## 2. Environment Variables

Create a `.env` file in the root directory of the project and configure the following environment variables:

```env dev example
# Python Server
PYTHON_PORT=5000
FLASK_ENV=development
LLAMA2_MODEL_NAME=TheBloke/Llama-2-7b-Chat-GGUF
LLAMA2_MODEL_PATH=/app/models/llama-2-7b-chat.Q5_K_M.gguf
MISTRAL_MODEL_NAME=TheBloke/Mistral-7B-Instruct-v0.1-GGUF
MISTRAL_MODEL_PATH=/app/models/mistral-7b-instruct-v0.1.Q4_K_M.gguf

# Node.js Server
NODE_PORT=4000
MONGO_URL=

# start app commands
NODE_COMMAND=npm run dev
PYTHON_COMMAND=watchmedo auto-restart --patterns="*.py" --recursive -- python run.py
REACT_COMMAND=npm start
```

## 3. Build and Run the Project

You can use the provided `Makefile` to manage the Docker containers. The following commands are available:

### Build Docker Images

```sh
make build
```

### Start Docker Containers

```sh
make up
```

### Stop Docker Containers

```sh
make down
```

### Show Logs

#### Logs for Python server

```sh
make logs-python
```

#### Logs for Node.js server

```sh
make logs-node
```

#### Logs for React.js server

```sh
make logs-react
```

### Execute Commands in Running Containers

#### Execute command in Python server

```sh
make exec-python
```

#### Execute command in Node.js server

```sh
make exec-node
```

### Clean Up Docker Containers and Images

```sh
make clean
```

## 4. Running the Project

To build the images and start the containers, you can run:

```sh
make run
```

This will build the Docker images, start the containers, and bring the project up and running.

### Accessing the Application

Once the containers are up and running, you can access the React frontend at:

```http
http://localhost:3000
```

Make sure that the backend APIs are accessible and the models are correctly placed in.