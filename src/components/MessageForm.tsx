import { Button } from '@/components/ui/button';
import { sendMessage, type MentionData } from '@/api';
import { useChatContext } from '@/useChatContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MentionsInput, Mention } from 'react-mentions';
import { useState, useRef } from 'react';

const defaultStyle = {
  control: {
    backgroundColor: '#fff',
    fontSize: 14,
    fontWeight: 'normal',
  },

  '&multiLine': {
    control: {
      fontFamily: 'monospace',
      minHeight: 63,
    },
    highlighter: {
      padding: 9,
      border: '1px solid transparent',
    },
    input: {
      padding: 9,
      border: '1px solid silver',
    },
  },

  '&singleLine': {
    display: 'inline-block',
    width: 180,

    highlighter: {
      padding: 1,
      border: '2px inset transparent',
    },
    input: {
      padding: 1,
      border: '2px inset',
    },
  },

  suggestions: {
    list: {
      backgroundColor: 'white',
      border: '1px solid rgba(0,0,0,0.15)',
      fontSize: 14,
    },
    item: {
      padding: '5px 15px',
      borderBottom: '1px solid rgba(0,0,0,0.15)',
      '&focused': {
        backgroundColor: '#cee4e5',
      },
    },
  },
};

const defaultMentionStyle = {
  backgroundColor: '#cee4e5',
};

export default function MessageForm() {
  const { activeChannelId, activeUserId, activeChannelMemberList } =
    useChatContext();
  const queryClient = useQueryClient();

  // Estados para el componente Mention
  const [value, setValue] = useState('');

  // Referencia al formulario
  const formRef = useRef<HTMLFormElement>(null);

  const sendMessageMutation = useMutation({
    mutationFn: ({
      content,
      channelId,
      channelMemberId,
      mentions,
    }: {
      content: string;
      channelId: number;
      channelMemberId: number;
      mentions?: MentionData[];
    }) => sendMessage(content, channelId, channelMemberId, mentions),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  // Preparar datos para react-mentions
  const mentionData = activeChannelMemberList
    .filter((m) => m.type === 'bot') // Solo bots para prueba
    .map((m) => ({
      id: m.id,
      display: m.member.name,
    }));

  const getMentionsFromText = (text: string) => {
    const mentionRegex = /@\[([^\]]+)\]\((\d+)\)/g;
    const foundMentions = [];
    let match;

    while ((match = mentionRegex.exec(text)) !== null) {
      const name = match[1];
      const memberId = parseInt(match[2], 10);

      // Opcional: si solo quieres devolver menciones de bots
      const member = activeChannelMemberList.find(
        (m) => m.type === 'bot' && m.id === memberId && m.member.name === name,
      );

      if (member) {
        foundMentions.push({
          memberId,
          name, // puedes usar `member.member.name` si quieres el nombre real del objeto
        });
      }
    }

    return foundMentions;
  };

  function removeMentionMarkup(text: string) {
    const mentionRegex = /@\[([^\]]+)\]\(\d+\)/g;
    return text.replace(mentionRegex, '@$1');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!value?.trim()) {
      return;
    }

    // Get the Member ID using the user ID
    const member = activeChannelMemberList.find(
      (m) => m.type === 'user' && m.member.id === activeUserId,
    );

    if (member === undefined) {
      console.error('Member not found');
      return;
    }

    if (activeChannelId === undefined) {
      console.error('Active channel ID is undefined');
      return;
    }

    const selectedMentions = getMentionsFromText(value);
    const content = removeMentionMarkup(value);

    sendMessageMutation.mutate({
      content: content,
      channelId: activeChannelId,
      channelMemberId: member.id,
      mentions: selectedMentions,
    });

    // Limpiar el input y las menciones después de enviar
    setValue('');
  }

  return (
    <div className="border-t bg-white p-4">
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <div className="flex-1">
            <MentionsInput
              value={value}
              onChange={(_event, newValue) => {
                setValue(newValue);
              }}
              style={defaultStyle}
              allowSpaceInQuery={true}
            >
              <Mention
                trigger="@"
                markup="@[__display__](__id__)"
                displayTransform={(_id, display) => `@${display}`}
                data={mentionData}
                style={defaultMentionStyle}
              />
            </MentionsInput>
          </div>
          <div>
            <Button
              type="submit"
              disabled={sendMessageMutation.isPending || !value.trim()}
            >
              {sendMessageMutation.isPending ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
