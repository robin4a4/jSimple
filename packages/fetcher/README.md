# @jsimple/fetcher

## Get started
To install the library enter the following command:

```
npm install @jsimple/fetcher
```

## Example

Using the fetcher package you can fetch and cache data easily.

```html
<!-- HTML file-->
<div data-define="component-with-data" class="component">
  <img src="./spinner.svg" $display="isLoading()" class="spinner" width=24 height=24 alt='spinner'/>
  <div $display="!isLoading()" class="card">
    <p class="font-bold uppercase text-14 text-slate-900">{data()?.name}</p>
    <span>{data()?.body}</span>
  </div>
</div>
```

```javascript
// Javascript file
import { run } from "@jsimple/dom-render";
import { GET, load } from "@jsimple/fetcher";

const getTodos = GET<TodoData>("https://jsonplaceholder.typicode.com/comments/1");

function ComponentWithData() {
  const { data, isLoading } = load(getTodos, ["keyString"]);
  return {
    data,
    isLoading,
  };
}
  
run([ComponentWithData]);
```

## API

### load()

this functions takes a promise in argument, execute it, caches the results and returns the following object:

```javascript
function load<Schema>(promise: Promise<Schema>, cacheKeys: Array<string | TSignal>): {
  data: TSignal | null,
  isLoading: TSignal,
  isError: TSignal,
  error: TSignal,
}
```

### GET()

```javascript
function GET<TData>(url: string, options: RequesterOptions): Promise<TData>
```
