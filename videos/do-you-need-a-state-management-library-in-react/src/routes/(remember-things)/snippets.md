# Remember things - Snippets

```
import { useState } from 'react';

const [counter, setCounter] = useState(0);

return <>
  <button onClick={() => setCounter(value => value - 1)}>-1</button>
  
  <p>{counter}</p>
  
  <button onClick={() => setCounter(value => value + 1)}>+1</button>
</>
```