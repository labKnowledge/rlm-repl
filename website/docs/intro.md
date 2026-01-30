# Welcome to RLM-REPL

**Recursive Language Model with REPL Inference Strategy**

RLM-REPL is a Python library that enables any language model to manage unlimited context using SQL-based retrieval with DuckDB.

## Quick Start

```bash
pip install rlm-repl
```

```python
from rlm_repl import RLMREPL, RLMConfig

config = RLMConfig(
    base_url="http://localhost:11434/v1",
    api_key="ollama",
    model="qwen3-coder",
)

with RLMREPL(config) as repl:
    repl.load_document("large_book.txt")
    result = repl.ask("What are the main themes?")
    print(result.answer)
```

## What is RLM-REPL?

RLM-REPL implements a human-like reading strategy for processing large documents:

1. **Overview** - Read the beginning to understand document structure
2. **Search** - Find relevant sections using keyword search
3. **Deep Read** - Extract detailed information from located sections
4. **Synthesize** - Combine findings into a comprehensive answer

This approach allows small context window models to effectively work with documents of any size.

## Key Features

- ✅ Works with any OpenAI-compatible API
- ✅ SQL-based retrieval (easier for LLMs than Python functions)
- ✅ Human-like reading strategy
- ✅ Works reliably with local, smaller models
- ✅ In-memory or persistent database options
- ✅ CLI tool and Python API

## Documentation

Explore the documentation to learn more:

- **[Getting Started](getting-started.md)** - Installation and first steps
- **[API Reference](api-reference.md)** - Complete API documentation
- **[Examples](examples.md)** - Usage examples
- **[Architecture](architecture.md)** - How it works
- **[Configuration](configuration.md)** - Configuration options
- **[Troubleshooting](troubleshooting.md)** - Common issues

## Why SQL Instead of Python Functions?

The library evolved from using LLM-generated Python functions to SQL queries because:

- SQL is easier for smaller LLMs to generate correctly
- More reliable than complex Python function generation
- Can search multiple keywords simultaneously
- Efficient querying with database indexes
- Works consistently across model sizes

## Get Started

Ready to try it? Head to the [Getting Started Guide](getting-started.md)!

