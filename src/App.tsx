import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ChannelList from './components/ChannelList';
import ChatMainPanel from './components/ChatMainPanel';
import SignInForm from './components/SignInForm';
import { useChatContext } from './useChatContext';

const queryClient = new QueryClient();

function App() {
  const { activeUserToken } = useChatContext();

  return (
    <QueryClientProvider client={queryClient}>
      {activeUserToken ? (
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
      ) : (
        <div className="@container/main p-10">
          <div className="m-auto w-xs">
            <SignInForm />
          </div>
        </div>
      )}
    </QueryClientProvider>
  );
}

export default App;
