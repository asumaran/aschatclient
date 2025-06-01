import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import { signIn } from '@/api';
import { useState } from 'react';
import { Alert, AlertDescription } from './ui/alert';
import { useChatContext } from '@/useChatContext';
import { useNavigate } from '@tanstack/react-router';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, {
    message: 'Password must be at least 4 characters.',
  }),
});

const SignInForm = () => {
  const { setActiveUserAccessToken, setActiveUserId } = useChatContext();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signInMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signIn(email, password),
    onSuccess: (data) => {
      setActiveUserAccessToken(data.access_token);
      setActiveUserId(data.userId);
      setErrorMessage('');
      navigate({ to: '/chat' });
    },
    onError: (error) => {
      console.error('Sign in failed:', error);
      setErrorMessage(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signInMutation.mutate({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <div>
      <Form {...form}>
        <h1 className="mb-10 text-2xl">Sign In</h1>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          {errorMessage && (
            <Alert variant="destructive">
              <AlertDescription>
                <p>{errorMessage}</p>
              </AlertDescription>
            </Alert>
          )}
          <FormField
            control={form.control}
            name="email"
            disabled={signInMutation.isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} autoFocus={true} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            disabled={signInMutation.isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={signInMutation.isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
