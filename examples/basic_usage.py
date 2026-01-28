#!/usr/bin/env python3
"""Basic usage example for RLM-REPL.

This example demonstrates how to use the RLM-REPL library to load a document
and ask questions about it.
"""

from rlm_repl import RLMREPL, RLMConfig


def main():
    # Create configuration
    # For Ollama (local):
    config = RLMConfig(
        base_url="http://localhost:11434/v1",
        api_key="ollama",  # Ollama doesn't require a real key
        model="qwen3-coder",  # or any model you have installed
        verbose=True,
        max_iterations=6,
    )

    # For OpenAI:
    # config = RLMConfig(
    #     base_url="https://api.openai.com/v1",
    #     api_key="your-api-key",
    #     model="gpt-4",
    # )

    # Create REPL instance
    with RLMREPL(config) as repl:
        # Load a document
        # repl.load_document("path/to/your/document.txt")

        # Or load text directly
        sample_text = """
        # Introduction to Machine Learning

        Machine learning is a subset of artificial intelligence that enables
        systems to learn and improve from experience without being explicitly
        programmed. It focuses on developing computer programs that can access
        data and use it to learn for themselves.

        ## Types of Machine Learning

        There are three main types of machine learning:

        1. Supervised Learning: The algorithm learns from labeled training data,
           and makes predictions based on that data. Examples include:
           - Classification (spam detection, image recognition)
           - Regression (price prediction, weather forecasting)

        2. Unsupervised Learning: The algorithm finds patterns in unlabeled data.
           Examples include:
           - Clustering (customer segmentation)
           - Dimensionality reduction (PCA)

        3. Reinforcement Learning: The algorithm learns by interacting with an
           environment and receiving rewards or penalties. Examples include:
           - Game playing (AlphaGo)
           - Robotics
           - Autonomous vehicles

        ## Deep Learning

        Deep learning is a subset of machine learning based on artificial neural
        networks with multiple layers. These networks can learn complex patterns
        and representations from data.

        Key concepts in deep learning:
        - Neural networks with multiple hidden layers
        - Backpropagation for training
        - Convolutional neural networks (CNNs) for image processing
        - Recurrent neural networks (RNNs) for sequential data
        - Transformers for natural language processing

        ## Applications

        Machine learning has numerous applications across industries:
        - Healthcare: Disease diagnosis, drug discovery
        - Finance: Fraud detection, algorithmic trading
        - Transportation: Self-driving cars, route optimization
        - Retail: Recommendation systems, demand forecasting
        - Manufacturing: Quality control, predictive maintenance

        The field continues to evolve rapidly with new techniques and applications
        emerging regularly.
        """

        repl.load_text(sample_text, "ml_intro")

        # Ask questions
        print("\n" + "=" * 70)
        print("Asking: What are the three types of machine learning?")
        print("=" * 70)

        result = repl.ask("What are the three types of machine learning?")

        # Access the result
        print(f"\nAnswer: {result.answer}")
        print(f"\nStatistics:")
        print(f"  Iterations: {result.iterations}")
        print(f"  Lines read: {result.unique_lines}")
        print(f"  Words read: {result.total_words}")
        print(f"  Time: {result.elapsed_time:.2f}s")


if __name__ == "__main__":
    main()
