# Tests

This document uses plugins defined in config.js to:

1. Add an extra header.
2. Add code highlighting support for the `magic` language.<br>
Existing languages continue to be highlighted.

```magic
There should be five Magic! exclamations above
```

```C
// This C code should continue to be highlighted as C
int main(int argv, char** argv) {
    printf("Hello world");
    return 0;
}
```
