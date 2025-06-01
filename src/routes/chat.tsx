import ChannelList from '@/components/ChannelList';
import ChatMainPanel from '@/components/ChatMainPanel';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/chat')({
  beforeLoad: async ({ location }) => {
    // Check authentication from localStorage
    const activeUserId = localStorage.getItem('activeUserId');
    const activeUserToken = localStorage.getItem('activeUserToken');

    if (!activeUserId || !activeUserToken) {
      throw redirect({
        to: '/',
        search: {
          // Opcional: guardar la ruta a la que quería acceder
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="@container/main">
      <div className="m-auto flex">
        <div className="m-2 mr-0 border-1">
          <ChannelList />
        </div>
        <div className="m-2 flex-1 border-1">
          <ChatMainPanel />
        </div>
      </div>
    </div>
  );
}
