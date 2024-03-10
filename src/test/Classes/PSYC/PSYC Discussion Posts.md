Tags: #PSYC-2760🧠🗣
Date Created: Thursday Apr 13th, 2023
Time Created: 15:03

---
# Resources

---
# General info about word embeddings
- Nice article on making word embeddings from Labs rotation: https://towardsdatascience.com/creating-word-embeddings-coding-the-word2vec-algorithm-in-python-using-deep-learning-b337d0ba17a8
- Contexto game: https://contexto.me/

## Text:
Hi everyone. I'm a CS major who did a bit of work with generating/using word embeddings last semester at an internship and am currently taking the NLP course.

Just thought I'd provide some good (semi-technical) resources that helped my intuition around word vectors.

First, just for fun here's a game I came across the other day that uses word vectors: https://contexto.me/
It's kind of like Wordle but the only feedback is the vector distance of your guesses from a target word. So ideally if the target were an animal then similar animals would get you closer to the target and guide your guesses. But as you'll see if you play it, the game just reveals how weird some of the embeddings can be since they're based on how words are used in a corpus NOT what they mean to readers. (also the distances are always from the target guesses with similar words can get dramatically different rankings. ex: ocean being much closer to the target than fish)

Second, this tutorial on making word embeddings with Python/TensorFlow: https://towardsdatascience.com/creating-word-embeddings-coding-the-word2vec-algorithm-in-python-using-deep-learning-b337d0ba17a8
There's a lot of code, but if you haven't worked with Python or TensorFlow before I think the illustrations and explanations are really helpful.
The general premise is having a model that takes large inputs (binary vector for a single word, ex: if "apple" were word #3 in a word-set then its binary vector would look something like [0, 0, 1, 0, ..., 0] in a vector that is as long as the english vocabulary is big) and attempts to summarize them as smaller vectors such as the 2-dimensional example in the tutorial.
This kind of pattern shows up all over the place now with auto-encoders which are used on images too (semantically-similar images should have vectors that are close together).

OpenAI has a really convenient API for summarizing full documents as vectors, which is a kind of second-order result of processing word vectors for the document: https://platform.openai.com/docs/guides/embeddings/use-cases#:~:text=We%20color%20the%20individual%20reviews
I was playing around with the API and fed in all my school notes and the clusters of more-similar (smaller vector distance) documents from the OpenAI vectors lined up perfectly with the subjects/classes (not a super useful insight, but still interesting to see that I could do something like use these vectors to recommend file organization. Or if I had a new document for a homework or project and didn't know where to look in my notes for similar topics I could get a vector for the new document and rank my notes by distance to that vector).
Worth noting that OpenAI document embeddings are 1536 dimensions to summarize up to 8000 words (I don't think the word-embedding size OpenAI uses is public) whereas GloVe word vectors (https://nlp.stanford.edu/projects/glove/) are 300 dimensions.