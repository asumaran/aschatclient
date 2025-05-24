import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { apiUrl } from '@/utils/api';
import { useChatContext } from '@/useChatContext';

export default function MessageForm() {
  const { activeChannelId } = useChatContext();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (!(formData.get('message') as string)?.trim()) {
      return;
    }

    await fetch(apiUrl('messages'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: formData.get('message'),
        channelId: activeChannelId,
        channelMemberId: 37, // The endpoint wants the member Id and not the user ID
      }),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <div className="flex-1 pr-5">
          <Input placeholder="Add a new message…" name="message" />
        </div>
        <div>
          <Button type="submit">Send</Button>
        </div>
      </div>
    </form>
  );
}
