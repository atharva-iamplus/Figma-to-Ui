```tsx
// @/components/ChatAppScreen.tsx

import React from 'react';
import { cn } from '@/lib/utils'; // Assuming cn utility is available for conditional classes
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Search,
  Phone,
  Video,
  Mic,
  Smile,
  Image as ImageIcon,
  MoreHorizontal,
  User,
} from 'lucide-react';

interface ConversationPreviewProps {
  avatarUrl: string;
  userName: string;
  lastMessage: string;
  isActive?: boolean;
}

const ConversationPreview: React.FC<ConversationPreviewProps> = ({
  avatarUrl,
  userName,
  lastMessage,
  isActive,
}) => (
  <Button
    variant="ghost"
    className={cn(
      'flex items-center gap-3 w-full justify-start p-2 rounded-lg',
      isActive && 'bg-secondary text-primary'
    )}
  >
    <Avatar className="h-10 w-10">
      <AvatarImage src={avatarUrl} alt={userName} />
      <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
    </Avatar>
    <div className="flex flex-col text-left">
      <h3 className="font-semibold text-base leading-tight text-foreground">
        {userName}
      </h3>
      <p className="text-sm text-muted-foreground leading-tight truncate">
        {lastMessage}
      </p>
    </div>
  </Button>
);

interface UserProfileDisplayProps {
  avatarUrl: string;
  userName: string;
  status: string; // e.g., "Online", "Offline", "Away"
  size?: 'sm' | 'md' | 'lg';
}

const UserProfileDisplay: React.FC<UserProfileDisplayProps> = ({
  avatarUrl,
  userName,
  status,
  size = 'md',
}) => {
  const avatarSize =
    size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-16 w-16' : 'h-12 w-12';
  const nameClass = size === 'lg' ? 'text-xl font-bold' : 'text-lg font-semibold';
  const statusClass = size === 'lg' ? 'text-sm' : 'text-xs';

  return (
    <div className="flex items-center gap-3">
      <Avatar className={avatarSize}>
        <AvatarImage src={avatarUrl} alt={userName} />
        <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <h3 className={cn(nameClass, 'text-foreground leading-tight')}>{userName}</h3>
        <p className={cn(statusClass, 'text-muted-foreground leading-tight')}>
          {status}
        </p>
      </div>
    </div>
  );
};

interface ChatMessageProps {
  sender: 'user' | 'other';
  content: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, content }) => (
  <div
    className={cn(
      'flex w-full',
      sender === 'user' ? 'justify-end' : 'justify-start'
    )}
  >
    <div
      className={cn(
        'max-w-[70%] p-3 rounded-lg',
        sender === 'user'
          ? 'bg-primary text-primary-foreground rounded-br-none'
          : 'bg-secondary text-secondary-foreground rounded-bl-none'
      )}
    >
      <p className="text-base">{content}</p>
    </div>
  </div>
);

interface DateDividerProps {
  date: string;
}

const DateDivider: React.FC<DateDividerProps> = ({ date }) => (
  <div className="relative flex justify-center text-xs uppercase text-muted-foreground my-6">
    <Separator className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-border" />
    <span className="bg-background px-2 z-10">{date}</span>
  </div>
);

interface ChatAppScreenProps {}

const ChatAppScreen: React.FC<ChatAppScreenProps> = () => {
  // Mock data for demonstration
  const conversations = [
    {
      avatarUrl: 'https://github.com/shadcn.png',
      userName: 'Alice Smith',
      lastMessage: 'Hey, are you free tomorrow?',
      isActive: true,
    },
    {
      avatarUrl: 'https://i.pravatar.cc/150?img=60',
      userName: 'Bob Johnson',
      lastMessage: 'Check out the new project brief.',
    },
    {
      avatarUrl: 'https://i.pravatar.cc/150?img=50',
      userName: 'Charlie Brown',
      lastMessage: 'Sounds good!',
    },
    {
      avatarUrl: 'https://i.pravatar.cc/150?img=48',
      userName: 'Diana Prince',
      lastMessage: 'Let\'s connect soon.',
    },
    {
      avatarUrl: 'https://i.pravatar.cc/150?img=47',
      userName: 'Eve Green',
      lastMessage: 'Meeting is rescheduled.',
    },
    {
      avatarUrl: 'https://i.pravatar.cc/150?img=46',
      userName: 'Frank White',
      lastMessage: 'Got it, thanks!',
    },
    {
      avatarUrl: 'https://i.pravatar.cc/150?img=45',
      userName: 'Grace Black',
      lastMessage: 'Can you send me the file?',
    },
    {
      avatarUrl: 'https://i.pravatar.cc/150?img=44',
      userName: 'Harry Red',
      lastMessage: 'I\'ll be there in 5.',
    },
    {
      avatarUrl: 'https://i.pravatar.cc/150?img=43',
      userName: 'Ivy Blue',
      lastMessage: 'Nice!',
    },
    {
      avatarUrl: 'https://i.pravatar.cc/150?img=42',
      userName: 'Jack Yellow',
      lastMessage: 'Okay.',
    },
  ];

  const activeChatUser = {
    avatarUrl: 'https://github.com/shadcn.png',
    userName: 'Alice Smith',
    status: 'Online',
  };

  const messages = [
    { sender: 'other', content: 'Hey, how are you doing today?' },
    { sender: 'user', content: 'I\'m doing great, thanks for asking! How about you?' },
    { sender: 'other', content: 'Not bad, just catching up on some work.' },
    { sender: 'user', content: 'Same here. Almost done with that report.' },
    { sender: 'other', content: 'Good to hear! Let me know if you need anything.' },
    { sender: 'user', content: 'Will do! Thanks!' },
  ];

  return (
    <div
      className="flex h-screen w-full overflow-hidden bg-background text-foreground"
      style={{ borderRadius: 'var(--radius)' }}
    >
      {/* Chat List Sidebar */}
      <div className="flex-none w-[300px] border-r bg-secondary p-4 flex flex-col gap-4 overflow-y-auto">
        <h2 className="text-2xl font-bold text-primary">App</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search chats..." className="pl-10" />
        </div>
        <div className="flex flex-col gap-2">
          {conversations.map((conv, index) => (
            <ConversationPreview key={index} {...conv} />
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-grow flex-col">
        {/* Active Chat Header */}
        <div className="flex-none p-4 border-b flex items-center justify-between">
          <UserProfileDisplay
            avatarUrl={activeChatUser.avatarUrl}
            userName={activeChatUser.userName}
            status={activeChatUser.status}
          />
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Chat Conversation Area */}
        <div className="flex-grow p-6 flex flex-col gap-4 overflow-y-auto">
          <DateDivider date="Today" />
          {messages.map((msg, index) => (
            <ChatMessage key={index} sender={msg.sender} content={msg.content} />
          ))}
        </div>

        {/* Reply Input Field */}
        <div className="flex-none p-4 border-t flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Mic className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Input placeholder="Type your message..." className="flex-grow" />
          <Button variant="ghost" size="icon">
            <Smile className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon">
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Active User Profile Sidebar */}
      <div className="flex-none w-[280px] border-l bg-secondary p-4 flex flex-col gap-6 overflow-y-auto">
        <div className="flex flex-col items-center text-center gap-2">
          <UserProfileDisplay
            avatarUrl={activeChatUser.avatarUrl}
            userName={activeChatUser.userName}
            status={activeChatUser.status}
            size="lg"
          />
          <Button variant="outline" className="mt-2 w-full max-w-[180px]">
            View Profile
          </Button>
        </div>
        <Separator className="bg-border" />
        <div className="flex flex-col gap-2">
          <Button variant="ghost" className="justify-start gap-3 w-full">
            <Search className="h-5 w-5 text-muted-foreground" />
            Search Chat
          </Button>
          <Button variant="ghost" className="justify-start gap-3 w-full">
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
            Sent Images
          </Button>
          <Button variant="ghost" className="justify-start gap-3 w-full">
            <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
            More Options
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatAppScreen;
```