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
    <div className="p-5">
      <h2 className="mb-5 border-b pb-2 text-2xl font-medium">
        List of Channels
      </h2>
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
    <div className="p-5">
      <h2 className="mb-5 border-b pb-2 text-2xl font-medium">
        List of Members
      </h2>
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

function Messages() {
  return <div className="p-5">messages</div>;
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="@container/main p-10">
        <div className="m-auto flex w-7xl">
          <div className="m-5 border-1">
            <Channels />
          </div>
          <div className="m-5 flex-1 border-1">
            <Messages />
          </div>
          <div className="m-5 border-1">
            <Members />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
