import SignInForm from '@/components/SignInForm';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="@container/main p-10">
      <div className="m-auto w-xs">
        <SignInForm />
      </div>
    </div>
  );
}
