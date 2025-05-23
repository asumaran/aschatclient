import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function MessageForm() {
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    await fetch('http://localhost:4000/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: message,
        channelId: 1,
        channelMemberId: 1,
      }),
    });

    setMessage('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <div className="flex-1 pr-5">
          <Input
            placeholder="Add a new message…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div>
          <Button type="submit">Send</Button>
        </div>
      </div>
    </form>
  );
}
