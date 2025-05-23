export async function getMembers(activeChannelId: number) {
  const url = `http://localhost:4000/channelmemberships/channelmembers/${activeChannelId}`;

  const data = await fetch(url);
  if (data.ok) {
    return await data.json();
  } else {
    return { error: 'Error fetching members' };
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
