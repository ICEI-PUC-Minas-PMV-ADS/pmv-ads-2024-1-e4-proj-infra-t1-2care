# Utilizar a imagem oficial do Python como base
FROM python:3.10-slim

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de requisitos e instala as dependências
RUN apt update && apt upgrade -y
RUN apt install -y python3-pip
RUN pip3 install pipenv
RUN python3 -m venv.venv && .venv/bin/activate

COPY requirements.txt requirements-dev.txt /app/
RUN pip install --no-cache-dir -r requirements.txt -r requirements-dev.txt

# Copia o resto do seu código da aplicação
COPY . /app

# Executa a aplicação
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
