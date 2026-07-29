---
script:
  - url: https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js
  - path: src/test/mermaid/mermaid-init.js
wait_for_function: 'window.mermaidRendered === true'
---

# Diagrams with Mermaid

```mermaid
graph LR
    Markdown --> Puppeteer --> PDF
```
