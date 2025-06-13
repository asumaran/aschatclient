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
import { signUp } from '@/api';
import { useState } from 'react';
import { Alert, AlertDescription } from './ui/alert';
import { useChatContext } from '@/useChatContext';
import { useNavigate, Link } from '@tanstack/react-router';

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: 'Name must be at least 2 characters.',
    }),
    email: z.string().email(),
    password: z.string().min(4, {
      message: 'Password must be at least 4 characters.',
    }),
    confirmPassword: z.string().min(4, {
      message: 'Password must be at least 4 characters.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const SignUpForm = () => {
  const { setActiveUserAccessToken, setActiveUserId } = useChatContext();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const signUpMutation = useMutation({
    mutationFn: ({
      email,
      password,
      name,
    }: {
      email: string;
      password: string;
      name: string;
    }) => signUp(email, password, name),
    onSuccess: (data) => {
      setActiveUserAccessToken(data.access_token);
      setActiveUserId(data.userId);
      setErrorMessage('');
      navigate({ to: '/chat' });
    },
    onError: (error) => {
      console.error('Sign up failed:', error);
      setErrorMessage(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signUpMutation.mutate({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  }

  return (
    <div>
      <Form {...form}>
        <h1 className="mb-10 text-2xl">Sign Up</h1>
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
            name="name"
            disabled={signUpMutation.isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} autoFocus={true} autoComplete="name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            disabled={signUpMutation.isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            disabled={signUpMutation.isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            disabled={signUpMutation.isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={signUpMutation.isPending}>
            Sign Up
          </Button>
          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/" className="text-blue-600 hover:underline">
              Sign in here
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
