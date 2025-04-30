export async function getMembers() {
  const data = await fetch('http://localhost:3000/users');
  if (data.ok) {
    return await data.json();
  } else {
    return { error: 'Error fetching members' };
  }
}

export async function getChannels() {
  const data = await fetch('http://localhost:3000/channels');
  if (data.ok) {
    return await data.json();
  } else {
    return { error: 'Error fetching channels' };
  }
}
