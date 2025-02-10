import axios from 'axios';
import React, { useState } from 'react';

export default function Foo() {
  const [res, setRes] = useState('');
  const payload = {
    text: 'Hello World!',
  };
  const handleApi = async () => {
    let response = await axios.post('http://localhost:3000/foo', payload);
    console.log(response);
    setRes(response.data);
  };

  return (
    <div>
      foo
      <button onClick={handleApi}>Click me</button>
      {res && <p>{res}</p>}
    </div>
  );
}
