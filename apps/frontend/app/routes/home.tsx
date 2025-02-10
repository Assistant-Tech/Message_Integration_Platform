/* eslint-disable no-empty-pattern */
/* eslint-disable react-refresh/only-export-components */
import Foo from '~/foo/foo';
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

export default function Home() {
  return (
    <div className="flex flex-col">
      <main>This is the home route</main>
      <Foo />
    </div>
  );
}
