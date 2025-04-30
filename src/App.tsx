import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { getChannels, getMembers } from './api';

function Channels() {
  const { data } = useQuery({
    queryKey: ['channels'],
    queryFn: getChannels,
  });
  return (
    <div>
      <h2>List of Channels</h2>
      {data && (
        <ul>
          {data.map((m) => (
            <li>
              <span>{m.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Members() {
  const { data } = useQuery<{ name: string; email: string }[]>({
    queryKey: ['members'],
    queryFn: getMembers,
  });
  return (
    <div>
      <h2>List of Members</h2>
      {data && (
        <ul>
          {data.map((m) => (
            <li>
              <span>
                {m.name} {'<'}
                {m.email}
                {'>'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-auto flex">
        <Channels />
        <Members />
      </div>
    </QueryClientProvider>
  );
}

export default App;
