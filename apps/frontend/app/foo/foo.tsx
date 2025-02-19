import { useMutation } from '@tanstack/react-query';
import type { IUserResponseType, IUserType } from '@repo/shared-types';
import axios from 'axios';

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
      );
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
