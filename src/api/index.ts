import { MemberShip } from '@/useChatContext';

export async function getMembers(activeChannelId: number) {
  const url = `http://localhost:4000/channelmemberships/channelmembers/${activeChannelId}`;

  const data = await fetch(url);
  if (data.ok) {
    return (await data.json()) as MemberShip[];
  } else {
    console.error('Error fetching members');
    return [];
  }
}

export async function getChannels() {
  const data = await fetch('http://localhost:4000/channels');
  if (data.ok) {
    return await data.json();
  } else {
    return { error: 'Error fetching channels' };
  }
}

export async function joinChannel(userId: number, channelId: number) {
  const data = await fetch('http://localhost:4000/channelmemberships', {
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

export async function getChannelMessages(activeChannelId) {
  const response = await fetch(
    `http://localhost:4000/messages/${activeChannelId}`,
  );
  return await response.json();
}

export async function leaveChannel(memberId: number, channelId: number) {
  console.log({ memberId, channelId });
  const response = await fetch(
    `http://localhost:4000/channelmemberships/user/${memberId}/channel/${channelId}`,
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
