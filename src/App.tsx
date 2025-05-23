import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ChannelList from './components/ChannelList';
import ChatMainPanel from './components/ChatMainPanel';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="@container/main p-10">
        <div className="m-auto flex w-7xl">
          <div className="m-5 mr-0 border-1">
            <ChannelList />
          </div>
          <div className="m-5 flex-1 border-1">
            <ChatMainPanel />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
