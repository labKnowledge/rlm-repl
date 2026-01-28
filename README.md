# RLM-REPL

**Recursive Language Model with REPL Inference Strategy**

A Python library that enables any language model to manage unlimited context using SQL-based retrieval with DuckDB.

## Overview

RLM-REPL implements a human-like reading strategy for processing large documents:

1. **Overview** - Read the beginning to understand document structure
2. **Search** - Find relevant sections using keyword search
3. **Deep Read** - Extract detailed information from located sections
4. **Synthesize** - Combine findings into a comprehensive answer

This approach allows small context window models to effectively work with documents of any size.

## Features

- **Two-sided architecture**: Separate Data and Inference layers
- **In-memory default**: Fast DuckDB in-memory database (no setup required)
- **Persistent option**: Optional persistent database for caching
- **CLI tool**: Instant testing from command line
- **Python API**: Full programmatic control
- **Streaming events**: Real-time progress tracking
- **Configurable verbosity**: Control output detail level

## Installation

```bash
pip install rlm-repl
```

Or install from source:

```bash
git clone https://github.com/labKnowledge/rlm-repl-sql.git
cd rlm-repl-sql
pip install -e .
```

## Quick Start

### CLI Usage

```bash
# Interactive mode
rlm-repl document.txt

# With custom model
rlm-repl document.txt --base-url http://localhost:11434/v1 --model qwen3-coder

# Single question mode
rlm-repl document.txt --question "What is the main topic?"

# Quiet mode
rlm-repl document.txt -q --question "Summarize the document"
```

### Python API

```python
from rlm_repl import RLMREPL, RLMConfig

# Configure for Ollama (local)
config = RLMConfig(
    base_url="http://localhost:11434/v1",
    api_key="ollama",
    model="qwen3-coder",
)

# Create REPL and load document
with RLMREPL(config) as repl:
    repl.load_document("large_book.txt")

    result = repl.ask("What are the main themes?")
    print(result.answer)
    print(f"Read {result.total_words} words in {result.elapsed_time:.1f}s")
```

### Streaming Events

```python
from rlm_repl import RLMREPL, RLMConfig, EventType

def on_event(event):
    if event.type == EventType.ITERATION_START:
        print(f"Starting iteration {event.data['iteration'] + 1}")
    elif event.type == EventType.RESULTS:
        print(f"Found {event.data['row_count']} lines")

config = RLMConfig(
    base_url="http://localhost:11434/v1",
    api_key="ollama",
    model="qwen3-coder",
    on_event=on_event,
)

with RLMREPL(config) as repl:
    repl.load_document("document.txt")
    result = repl.ask("What is discussed in chapter 5?")
```

### Persistent Database

```python
from rlm_repl import RLMREPL, RLMConfig, DatabaseConfig

# Use persistent database to cache document
db_config = DatabaseConfig(
    persistent=True,
    db_path="./document_cache.db",
)

config = RLMConfig(
    base_url="http://localhost:11434/v1",
    api_key="ollama",
    model="qwen3-coder",
    database=db_config,
)

with RLMREPL(config) as repl:
    # First run: loads and caches document
    # Subsequent runs: uses cached data
    repl.load_document("large_document.txt")
    result = repl.ask("Your question here")
```

## Configuration

### Environment Variables

```bash
RLM_BASE_URL=http://localhost:11434/v1
RLM_API_KEY=ollama
RLM_MODEL=qwen3-coder
RLM_VERBOSE=true
RLM_MAX_ITERATIONS=6
RLM_DB_PERSISTENT=false
RLM_DB_PATH=./cache.db
```

### RLMConfig Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `base_url` | str | required | API base URL |
| `api_key` | str | required | API key |
| `model` | str | required | Model name |
| `verbose` | bool | True | Enable verbose output |
| `max_iterations` | int | 6 | Max reading iterations |
| `temperature` | float | 0.2 | LLM temperature |
| `synthesis_temperature` | float | 0.3 | Temperature for synthesis |
| `database` | DatabaseConfig | in-memory | Database configuration |
| `on_event` | callable | None | Event callback |

## Architecture

```
rlm_repl/
├── core/
│   ├── config.py      # Configuration classes
│   ├── database.py    # DuckDB document storage
│   └── repl.py        # Main REPL engine
├── inference/
│   ├── client.py      # LLM client abstraction
│   ├── strategy.py    # Reading strategy prompts
│   └── synthesizer.py # Answer synthesis
├── events/
│   └── streaming.py   # Event system for progress tracking
├── cli/
│   └── main.py        # Command-line interface
└── utils/
    └── formatting.py  # Output formatting utilities
```

## How It Works

1. **Document Loading**: Text is parsed into lines with metadata (headers, code blocks, list items)
2. **SQL Storage**: Lines are stored in DuckDB with indexes for efficient querying
3. **Reading Strategy**: LLM decides what to read using SQL queries
4. **Iterative Reading**: Multiple passes gather relevant information
5. **Answer Synthesis**: Final answer is generated from gathered context

### Reading Modes

- **overview**: Read document beginning (lines 1-100)
- **search**: Find keywords with `LIKE '%term%'`
- **read**: Focused reading (20-50 lines)
- **deep_read**: Detailed analysis (50-100 lines)

## Supported Models

Any OpenAI-compatible API:
- **Ollama** (local): llama3, qwen3, mistral, etc.
- **OpenAI**: gpt-4, gpt-3.5-turbo
- **vLLM**: Any hosted model
- **LMStudio**: Local models
- **Together AI**, **Groq**, etc.

## Examples

See the `examples/` directory:
- `basic_usage.py` - Simple document Q&A
- `streaming_events.py` - Real-time progress tracking
- `persistent_database.py` - Caching documents
- `api_usage.py` - Building applications with RLM-REPL

## Development

```bash
# Install with dev dependencies
pip install -e ".[dev]"

# Run tests
pytest

# Format code
ruff format rlm_repl

# Type checking
mypy rlm_repl
```

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions welcome! Please open an issue or submit a pull request.

## Acknowledgments

Based on the RLM-REPL v8 concept - human-like reading strategies for LLM document processing.
