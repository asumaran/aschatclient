import SignUpForm from '@/components/SignUpForm';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/signup')({
  component: SignUpRouteComponent,
});

function SignUpRouteComponent() {
  return (
    <div className="@container/main">
      <div className="m-auto w-xs">
        <SignUpForm />
      </div>
    </div>
  );
}
