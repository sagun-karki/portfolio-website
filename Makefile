# Makefile for Flask Portfolio Website

# Variables
PYTHON = python
PIP = pip
APP_ENTRY = api/app.py

.PHONY: help install run clean

help:
	@echo "Available commands:"
	@echo "  make install  - Install dependencies from requirements.txt"
	@echo "  make run      - Run Flask server in development mode"
	@echo "  make clean    - Clean up Python cache and temporary files"

install:
	$(PIP) install -r requirements.txt

run:
	FLASK_DEBUG=true $(PYTHON) $(APP_ENTRY)

clean:
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
	find . -type f -name "*.pyo" -delete
	find . -type f -name "*.pyd" -delete
	find . -type d -name "*.egg-info" -exec rm -rf {} +
	find . -type d -name "*.egg" -exec rm -rf {} +
