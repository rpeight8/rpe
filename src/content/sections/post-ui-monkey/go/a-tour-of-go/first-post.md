---
title: "A Small Go Tour Moment: The Reader Exercise"
description: 'The difference between ''A'' and "A" in Go'
date: 2026-05-07
order: 1
---

I continued working through the Go Tour today and one of the [exercises asked me to implement a custom `Reader`](https://go.dev/tour/methods/22).
My first instinct was to use `"A"` as a JavaScript monkey would.

```
Implement a Reader type that emits an infinite stream of the ASCII character 'A'.
```

```go
package main

import "golang.org/x/tour/reader"

type MyReader struct{}

func (r MyReader) Read(s []byte) (int, error) {
	for i := range s {
		s[i] = "A";
	}

	return len(s), nil;
}


func main() {
	reader.Validate(MyReader{})
}

```

And I immediately got an error:

```
cannot use "A" (untyped string constant) as byte value in assignment
```

That stopped me for a second. It looks so harmless.

At that point I didn’t fully understand what was wrong, so I ended up asking ChatGPT about it and digging a bit deeper: there are the differences between `'A'` and `"A"` in Go.

I don’t think I have a fully correct understanding of why this works yet, but the high-level idea is starting to settle in my mental model (I'm pretty sure I'm still wrong):

A rune like `'A'` is just a single value that can fit directly into a byte. A string like `"A"`, on the other hand, is something more complex—likely a structure that points to a sequence of bytes plus some length information.

So in my head, it kind of makes sense why Go lets me assign `'A'` into a `[]byte`, but rejects `"A"`: one is a raw value, the other is a structured string.

I’ll revisit this later once this mental model either becomes clearer or breaks completely.
