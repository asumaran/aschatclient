import { useChatContext } from '@/useChatContext';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { activeUserId } = useChatContext();

  return (
    <>
      <div className="flex">
        <div className="flex-1 p-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{' '}
          <Link to="/chat" className="[&.active]:font-bold">
            Chat
          </Link>{' '}
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>{' '}
          <Link to="/signup" className="[&.active]:font-bold">
            Sign up
          </Link>
        </div>
        <div className="p-2">
          {activeUserId && <Link to="/signout">Sign out</Link>}
        </div>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
