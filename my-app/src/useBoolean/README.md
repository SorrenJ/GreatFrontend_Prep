Implement a useBoolean hook that manages a boolean state, with additional convenience utility methods.

export default function Component() {
  const { value, setTrue, setFalse } = useBoolean();

  return (
    <div>
      <p>{value ? 'enabled' : 'disabled'}</p>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}
Arguments
initialValue: boolean: Initial value of the boolean state. If not provided, it should default to false.
Returns
The useBoolean hook returns an object with the following properties.

value: boolean: The current boolean state
setTrue: () => void: A function to set the boolean state to true
setFalse: () => void: A function to set the boolean state to false


# My Solution

1. Declare the variables

```js
type UseBooleanReturn = {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
    toggle: () => void;
};

```
`value` returns boolean since it is either true of false, (starting as false)

the other variables are void since they can either hold null or some data



2. We have to create a function 

We write this:

``` js

export default function useBoolean(initialValue: boolean = false) {}
```

we can also add this to end of the function for additional security, but it is optional:

``` js
export default function useBoolean(initialValue: boolean = false): UseBooleanReturn {}



```

Inside the brackets we declare and intialize the `intitialValue` as false, while making sure we include the datatype, boolean

``` js

initialValue: boolean = false

```

3. Now we intialize the `useState`

Let's not forget to set our useStates for `value` as this would change overtime and to trigger re-render

```js
const [value, setValue] = useState(initialValue);
```

On the first render, the state will be assigned to intitial value. 

`value` will be the current state which is currently assigned as false

`setValue` is a function that updates the state. It allows it to toggle, setting it as true or false. It is a way for React to remember the value between renders 


4. Inside the useBoolean function we can now implement the helper functions, `setTrue`, `setFalse`, and `toggle`


``` js
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
    const toggle = () => setValue(prev => !prev);
  return { value, setTrue, setFalse, toggle };

```


These helper functions are clousures running inside the `useBoolean` function, closing over setValue. Let's discuss each of them:

`setTrue` schedules the state to be true

`setFalse` schedules the state to become false

`toggle` uses `prev => !prev` to flip the latest state, returning the inverted state

Finally we return the updated values

`return { value, setTrue, setFalse, toggle };`

In the client page we can invoke the `useBoolean` hook like this:

` const { value, setTrue, setFalse, toggle } = useBoolean();`