# bones interface

Higher-level, product-ready components built on the open-source bones
primitives: AI chat, message bubbles, thinking/streaming states, prompt
textarea, and friends.

This directory is reserved for the commercially licensed tier. It is empty
until two decisions land (see `docs/DECISIONS.md`):

1. **Where the code lives**: in this repo under a source-available license
   (an `/ee`-style folder), or in a separate private repo.
2. **How it's distributed**: authenticated registry, private npm, or a
   one-time-purchase download.

Nothing in `packages/` may ever depend on anything in `interface/`.
The dependency arrow only points the other way.
