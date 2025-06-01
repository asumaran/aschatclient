import { MemberShip } from '@/useChatContext';
import { apiUrl } from '@/utils/api';

export async function getMembers(activeChannelId: number) {
  const data = await fetch(
    apiUrl(`/channelmemberships/channelmembers/${activeChannelId}`),
  );
  if (data.ok) {
    return (await data.json()) as MemberShip[];
  } else {
    console.error('Error fetching members');
    return [];
  }
}

export async function getChannels() {
  const data = await fetch(apiUrl('/channels'));
  if (data.ok) {
    return await data.json();
  } else {
    return { error: 'Error fetching channels' };
  }
}

export async function joinChannel(userId: number, channelId: number) {
  const data = await fetch(apiUrl('/channelmemberships'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      channelId,
    }),
  });

  if (data.ok) {
    return await data.json();
  } else {
    console.error('Error joining channel');
  }
}

export interface ChannelMessage {
  channelId: number;
  channelMemberId: number;
  content: string;
  createdAt: string;
  id: number;
  updatedAt: string;
}

export async function getChannelMessages(activeChannelId: number) {
  const response = await fetch(apiUrl(`/messages/${activeChannelId}`));
  return (await response.json()) as ChannelMessage[];
}

export async function sendMessage(
  content: string,
  channelId: number,
  channelMemberId: number,
) {
  const response = await fetch(apiUrl('messages'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content,
      channelId,
      channelMemberId,
    }),
  });

  if (response.ok) {
    return await response.json();
  } else {
    const res = await response.json();
    throw new Error(res.message);
  }
}

export async function leaveChannel(memberId: number, channelId: number) {
  const response = await fetch(
    apiUrl(`/channelmemberships/user/${memberId}/channel/${channelId}`),
    {
      method: 'DELETE',
    },
  );

  if (response.ok) {
    return await response.json();
  } else {
    console.error('Error leaving channel');
  }
}

export async function signIn(email: string, password: string) {
  const response = await fetch(apiUrl('/auth/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    return await response.json();
  } else {
    const res = await response.json();
    console.error('Error sign in');
    throw new Error(res.message);
  }
}
