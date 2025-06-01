import { useChatContext } from '@/useChatContext';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/signout')({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    setActiveUserId,
    setActiveUserAccessToken,
    setActiveChannelId,
    setActiveChannelMemberList,
    setChannelList,
  } = useChatContext();

  const navigate = useNavigate();

  useEffect(() => {
    setActiveUserId(undefined);
    setActiveUserAccessToken('');
    setActiveChannelId(undefined);
    setActiveChannelMemberList([]);
    setChannelList([]);

    // Clear localStorage (it will be cleared automatically by the useEffect in GlobalContext)
    // But we also do it manually for safety
    localStorage.removeItem('activeUserId');
    localStorage.removeItem('activeUserToken');

    // Redirect to home page after clearing session data
    navigate({ to: '/' });
  }, [
    setActiveUserId,
    setActiveUserAccessToken,
    setActiveChannelId,
    setActiveChannelMemberList,
    setChannelList,
    navigate,
  ]);

  return (
    <div className="@container/main p-10">
      <div className="m-auto w-xs text-center">
        <h1 className="mb-4 text-2xl">Signing out...</h1>
        <p>Please wait while we sign you out.</p>
      </div>
    </div>
  );
}
