# Progress Bars Exercise

Build an app where clicking the "Add" button adds progress bars to the page. The progress bars fill up gradually as soon as they are shown.

Requirements
Clicking on the "Add" button adds a progress bar to the page.
Each progress bar start filling up smoothly as soon as they're added
Each bar takes approximately 2000ms to completely fill up.


# My Solution

Since adding a new bar and animating it to fill up involves a side effect, in this case manually changing the DOM, we need to implement a useEffect because it involves processes happening outside of React's processes.

`import React, { useState, useEffect } from "react";`

We can also declare the state of `filled` if we want to in an interface.


```js

interface Bar {
  filled?: boolean; // optional because it's undefined initially
}

```
The `?` means it can be left `undefined`

## useStates

We also need a useState to track the updated bars, and the updates of adding a new bar.

` const [bars, setBars] = useState<Bar[]>([]);`

Remember we destructure useStates like this;

`const [value, setValue] = useState(initialValue);`


`bars` is the current state value, which will be an array of `Bar` objects

`setBars` is the function to update the array

`useState<Bar[]>([])`

`<Bar[]>`  Since we are using Typscript we need to define a datatype for Bar we do it like so

`([])` we write this to start as an empty array


## useAddBar()

Now Let's create a function to add a bar

```js
function useAddbar() {
    setBars((prev) => [...prev, {}]);
  }

```
The above function takes the current `bars` array (prev), makes a new array that contains every previous item plus a brand-new empty object at the end, and tells React to update state to that new array. This causes a re-render showing one more progress bar.

Heres a breakdown:

When `useAddbar()` is called, `setBars(prev => ...)`. This makes React call that function with the latest state value being prev. 

Once the `prev` parameter is passed, the spread operator: `[...prev, {}]` builds a new array without mutating the previous array. 

`...prev` copies all elements from the old array into an new array, preserving references to existing bar objects.

`{}` appends a brand new object (an empty bar object) at the end.


As a result the function generates a brand-new empty object with no properties, so `filled` will be `undefined`. 

Since `undefined` is falsy, the bar will render at 0%. In the upcoming useEffect(), filled will be set to  `true` 


## Calling useAddbar in the client

In the returned html we can now add a button to render a new bar. 

```js
     <button onClick={useAddbar}>Add</button>
      {bars.map((bar, index) => (
        <div className="progress-container" key={index}>
          <div
            className="bar"
            style={{ width: bar.filled ? "100%" : "0%" }}
          ></div>
        </div>
      ))}
```
`button onClick={useAddbar}` invodes the `useAddbar()` that we implemented earlier and renders an object (bar) from the array.

`bars.map((bar, index) => (...))` we use this to populate the bars from the current state value: `bars` array which might look like [] then [{}, {}], etc

Heres a breakdown:

`bars` is the component state: an array

`.map(...)` iterates the array and returns an array of React elements, one for each bar

`bar` is the item of the array

`index` are the indices or keys for each item 

We place the key to identify each items in the list and we do so like `key={item}`

This gives each item a unique id, we place it in the item's parent container. 

`<div className="progress-container" key={index}>`

Now we want to determine the width of fill for each populated bar. We do this by making an inline stlye with a ternary operator.

If it is true that the bar is filled then it would be "100%" if else then "0%"

Remember we write the ternary operator like:

`<condition> ? <expression if true> : <expression if false> `

` style={{ width: bar.filled ? "100%" : "0%" }} `

## useEffect

When the number of bars changes, this effect marks the last bar's `filled` property to `true` (by creating a shallow copy of the array). then after a short timeout it replaces the state with that modified array so the bar's width changes to 100% and the CSS transition animates it.

```js
  useEffect(() => {
    // Animate the last added bar
    if (bars.length > 0) {
      const newBars = [...bars];
      newBars[newBars.length - 1].filled = true;
      setTimeout(() => setBars(newBars), 50); // small delay to trigger CSS transition
    }
  }, [bars.length]);

  ```
After `  setBars((prev) => [...prev, {}]);` is called the new bar is `undefined` a falsy value, so `width:0%`. 

After this, React paints the screen and runs the useEffect callbacks whose dependencies changed, thats when this effect runs (depeendency array being [bars.length], changed due to adding a new item or bar, increasing the length)

``` js
useEffect(() => { ... }, [bars.length]);
```

useEffect is run because the dependency changed. We use `bars.length` as the depedency to animate a newly added bar (last one), and it also keeps the effect from running on other internal changes to the array contents.

Inside useEffect we have `if (bars.length > 0) { ... }` as a guard clause, so the effect does nothing if the array is empty.


`const newBars = [...bars];` We need to create a shallow copy of the array, so React can detect that the array has changed and re-render the component. Without it, React might miss the update because the reference to the array never changed.


`newBars[newBars.length - 1].filled = true;` Here we point to an index of `newBars` and minus one since they are zero-indexed, and we'd be pointing at an index of undefined. 
So like: 

newBars[0] 

newBars[1]

newBars[newBars.length - 1] -> would point to the last index being newBars[1]

if we did newBars[newBars.length] -> would point to newBars[2], which doesn't exist and undefined

`.filled = true;` Since this started at falsy, we set the most recent bar to true as "ready to fill"

`setTimeout(() => setBars(newBars), 50);` The setTimeout prevents coalescing or merging of multiple DOM updates into one paint. Without this, it immeditltely sets the width to 100%. This ensures a smooth transition from 0% to 100%




