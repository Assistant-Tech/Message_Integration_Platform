import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import type { IUserType, IUserResponseType } from '@repo/shared-types';

function Foo() {
  const payload: IUserType = {
    name: 'test',
    email: 'test@mail.com',
    password: 'password',
  };

  const mutation = useMutation<IUserResponseType, Error, void>({
    mutationFn: async () => {
      const response = await axios.post(
        'http://localhost:3000/api/foo',
        payload,
      ;
      return response.data;
    },
  });

  return (
    <div>
      <button onClick={() => mutation.mutate()}>Post foo</button>
      {mutation.isPending && <p>Posting...</p>}
      {mutation.isError && <p>An error occurred: {mutation.error?.message}</p>}
      {mutation.data && <p>{JSON.stringify(mutation.data)}</p>}
    </div>
  );
}

export default Foo;
