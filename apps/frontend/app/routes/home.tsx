import Foo from '~/foo/foo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Assistant Tech' },
    {
      name: 'description',
      content: 'A complete solution for your business needs `nbasda , ${}` ',
    },
  ];
}

const queryClinet = new QueryClient();
export default function Home() {
  return (
    <QueryClientProvider client={queryClinet}>
      <div className="flex flex-col">
        <main>This is the home route</main>
        <Foo />
      </div>
    </QueryClientProvider>
  );
}
