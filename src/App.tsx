import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MessageForm from '@/components/MessageForm';
import ChatMessages from './components/ChatMessages';
import ChannelList from './components/ChannelList';
import ChannelMembers from './components/ChannelMembers';

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
            <div id="a" className="flex h-full">
              <div id="b" className="flex flex-1 flex-col p-5 pr-0">
                <div id="ba" className="flex-1 overflow-auto border-1 p-5">
                  <ChatMessages />
                </div>
                <div id="bb" className="mt-5 border-1 p-5">
                  <MessageForm />
                </div>
              </div>
              <div id="c" className="m-5 border-1">
                <ChannelMembers />
              </div>
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
