import ChannelList from '@/components/ChannelList';
import ChatMainPanel from '@/components/ChatMainPanel';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/chat')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="@container/main p-10">
      <div className="m-auto flex">
        <div className="m-5 mr-0 border-1">
          <ChannelList />
        </div>
        <div className="m-5 flex-1 border-1">
          <ChatMainPanel />
        </div>
      </div>
    </div>
  );
}
