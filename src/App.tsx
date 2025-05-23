import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { getMembers } from './api';
import MessageForm from '@/components/MessageForm';
import ChatMessages from './components/ChatMessages';
import ChannelList from './components/ChannelList';

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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="@container/main p-10">
        <div className="m-auto flex w-7xl">
          <div className="m-5 border-1">
            <ChannelList />
          </div>
          <div className="m-5 flex-1 border-1">
            <div className="flex h-full flex-col p-5">
              <div className="flex-1 border-1 p-5">
                <ChatMessages />
              </div>
              <div className="mt-5 border-1 p-5">
                <MessageForm />
              </div>
            </div>
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
