import { Button } from './ui/button';

const NotAChannelMember = () => {
  return (
    <div className="flex-1 place-content-center p-5 text-center">
      <p className="mb-5">
        You're not a member of this channel. Would you like to join?
      </p>
      <Button>Join Channel</Button>
    </div>
  );
};

export default NotAChannelMember;
