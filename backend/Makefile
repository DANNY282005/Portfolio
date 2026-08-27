.PHONY: setup run lint lint-fix test test-cov format format-check pipeline

setup:
	uv sync

run:
	uv run uvicorn main:app --host 0.0.0.0 --port 8000 --reload

lint:
	uv run ruff check .
	uv run ruff format --check .

lint-fix:
	uv run ruff check --fix .
	uv run ruff format .

test:
	uv run pytest

test-cov:
	uv run pytest --cov=src --cov-report=term-missing

format:
	uv run ruff format .

format-check:
	uv run ruff format --check .

pipeline: lint test-cov
