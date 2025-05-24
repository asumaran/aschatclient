import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { sendMessage } from '@/api';
import { useChatContext } from '@/useChatContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function MessageForm() {
  const { activeChannelId, activeUserId, activeChannelMemberList } =
    useChatContext();
  const queryClient = useQueryClient();

  const sendMessageMutation = useMutation({
    mutationFn: ({
      content,
      channelId,
      channelMemberId,
    }: {
      content: string;
      channelId: number;
      channelMemberId: number;
    }) => sendMessage(content, channelId, channelMemberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const currTarget = e.currentTarget;
    const formData = new FormData(e.currentTarget);

    const messageContent = formData.get('message') as string;
    if (!messageContent?.trim()) {
      return;
    }

    // Get the Member ID using the user ID
    const member = activeChannelMemberList.find(
      (m) => m.userId === activeUserId,
    );

    if (member === undefined) {
      console.error('Member not found');
      return;
    }

    sendMessageMutation.mutate({
      content: messageContent,
      channelId: activeChannelId,
      channelMemberId: member.id,
    });

    currTarget.reset();
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
