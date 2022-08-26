---
pdf_options:
  format: a4
  margin: 30mm 25mm
  headerTemplate: >-
    <style>div { font-size: 11px; width: 100%; text-align: center; }</style>
    <div>Header</div>
  footerTemplate: >-
    <div>
      Page <span class="pageNumber"></span>
      of <span class="totalPages"></span>
    </div>
---

# Markdown To Pdf

## 1. Images

![Markdown Mark](markdown-mark.svg)

## 2. Typography

### 2.1. Paragraph

**Lorem ipsum** dolor sit amet consectetur adipisicing elit. Quisquam, itaque ~~error vero~~ eius perferendis [googlum](https://google.com) iusto voluptas, eum saepe quae nemo et ab, nostrum debitis sequi quas. _Est eum officia praesentium._

### 2.2. Lists

#### 2.2.1. Unordered

- foo
- bar

#### 2.2.2. Ordered

1. foo
1. bar

### 2.3. Blockquote

> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, itaque error vero eius perferendis iusto voluptas, eum saepe quae nemo et ab, nostrum debitis sequi quas. Est eum officia praesentium.

## 3. Tables

| Key | Value |
| --- | ----- |
| foo | bar   |
| bar | foo   |

## 4. Long Paragraph

Cross-reference to [The End](#7-the-end).

Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime eos, fugit totam laboriosam harum earum cupiditate corporis, facilis nulla dolor hic consequatur. Magnam maiores unde aut esse est perferendis quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nobis laudantium iste repudiandae! Iusto, voluptas. Suscipit, iure autem! Fugiat, enim? Placeat quisquam optio reiciendis similique et ex voluptatum labore sit?

## 5. Highlighted Code

```js
const foo = 'bar';
console.log(foo === 'bar'); // => true

const longString =
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, itaque error vero eius perferendis iusto voluptas, eum saepe quae nemo et ab, nostrum debitis sequi quas. Est eum officia praesentium.';
```

```html
<h1>I'm a Header</h1>
```

## 6. Inline `Code`

Lorem `ipsum` dolor sit `amet consectetur` adipisicing elit.

## 7. The End

Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime eos, fugit totam laboriosam harum earum cupiditate corporis, facilis nulla dolor hic consequatur. Magnam maiores unde aut esse est perferendis quos.
