```typescript
import React, { ReactNode, InputHTMLAttributes, ButtonHTMLAttributes } from 'react';
import {
  Search, Filter, Bell, Settings, Star, Mail, User, Phone, MessageSquare, Google, Facebook,
  Home, ClipboardList, Music, MessageCircle, Info, LogOut, MoreVertical, Send, CalendarDays,
  type Icon as LucideIcon // Import type for Lucide icons
} from 'lucide-react';

// Helper function for combining class names
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// --- Base Prop Interfaces ---
interface BaseProps {
  children?: ReactNode;
  className?: string;
}

interface CardProps extends BaseProps {
  title?: string;
  description?: string;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
}

// --- COMMON COMPONENTS ---

/**
 * 51. Avatar
 * Displays a user's avatar image, with a fallback to initials if no image is provided.
 */
interface AvatarProps extends BaseProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
const Avatar: React.FC<AvatarProps> = ({ src, alt = 'Avatar', size = 'md', className }) => {
  let sizeClasses: string;
  switch (size) {
    case 'sm': sizeClasses = 'w-8 h-8'; break;
    case 'md': sizeClasses = 'w-10 h-10'; break;
    case 'lg': sizeClasses = 'w-12 h-12'; break;
    case 'xl': sizeClasses = 'w-16 h-16'; break;
  }
  return (
    <img
      src={src || `https://api.dicebear.com/7.x/initials/svg?seed=${alt}`} // DiceBear for initials fallback
      alt={alt}
      className={cn('rounded-full object-cover flex-shrink-0', sizeClasses, className)}
    />
  );
};

/**
 * 52. Icon
 * Renders a Lucide-React icon component.
 */
interface LucideIconProps extends BaseProps {
  icon: LucideIcon; // Expects a Lucide icon component, e.g., `Search`
  size?: number;
  strokeWidth?: number;
  color?: string;
}
const Icon: React.FC<LucideIconProps> = ({ icon: LucideComponent, size = 20, strokeWidth = 2, color = 'currentColor', className }) => {
  return (
    <LucideComponent size={size} strokeWidth={strokeWidth} color={color} className={className} />
  );
};

/**
 * 53. Title Text
 * A prominent text component for titles.
 */
const TitleText: React.FC<BaseProps> = ({ children, className }) => (
  <h1 className={cn('text-2xl font-bold text-gray-900', className)}>
    {children}
  </h1>
);

/**
 * 54. Subtitle Text
 * A secondary text component for subtitles or section headings.
 */
const SubtitleText: React.FC<BaseProps> = ({ children, className }) => (
  <h2 className={cn('text-lg font-semibold text-gray-700', className)}>
    {children}
  </h2>
);

/**
 * 55. Generic Text
 * Standard paragraph text.
 */
const GenericText: React.FC<BaseProps> = ({ children, className }) => (
  <p className={cn('text-base text-gray-600', className)}>
    {children}
  </p>
);

/**
 * 57. App Title
 * Large, styled text for application titles.
 */
const AppTitle: React.FC<BaseProps> = ({ children, className }) => (
  <h1 className={cn('text-3xl font-extrabold text-blue-600 tracking-tight', className)}>
    {children}
  </h1>
);

/**
 * 58. Horizontal Rule
 * A horizontal line for visual separation.
 */
const HorizontalRule: React.FC<BaseProps> = ({ className }) => (
  <hr className={cn('my-4 border-t border-gray-300', className)} />
);

/**
 * 19. Icon Button
 * A button that primarily displays an icon.
 */
interface IconButtonProps extends ButtonProps {
  icon: LucideIcon;
  iconSize?: number;
}
const IconButton: React.FC<IconButtonProps> = ({ icon, iconSize = 20, className, ...props }) => (
  <button
    className={cn('p-2 rounded-full text-gray-600 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300', className)}
    {...props}
  >
    <Icon icon={icon} size={iconSize} />
  </button>
);

/**
 * 20. Primary Button
 * A prominent button for primary actions.
 */
const PrimaryButton: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button
    className={cn('bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50', className)}
    {...props}
  >
    {children}
  </button>
);

/**
 * 15. Search Input
 * An input field specifically for search, with a search icon.
 */
const SearchInput: React.FC<InputProps> = ({ className, id = 'search-input', ...props }) => (
  <div className={cn('relative', className)}>
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
    <input
      id={id}
      type="text"
      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="Search..."
      {...props}
    />
  </div>
);

// --- DASHBOARD COMPONENTS ---

/**
 * 8. Chart Axis Label
 * Text label for chart axes.
 */
const ChartAxisLabel: React.FC<BaseProps> = ({ children, className }) => (
  <span className={cn('text-sm text-gray-500 font-medium', className)}>
    {children}
  </span>
);

/**
 * 9. Chart Bar
 * A visual representation of a single bar in a bar chart.
 */
interface ChartBarProps extends BaseProps {
  height: number; // Percentage height, e.g., 75 for 75%
  label?: string;
  color?: string;
}
const ChartBar: React.FC<ChartBarProps> = ({ height, label, color = 'bg-blue-500', className }) => (
  <div className={cn('flex flex-col items-center justify-end h-full w-8', className)}>
    <div
      className={cn('w-full rounded-t-md', color)}
      style={{ height: `${height}%` }}
    ></div>
    {label && <span className="mt-1 text-xs text-gray-600">{label}</span>}
  </div>
);

/**
 * 10. Data List Card
 * A card component designed to hold a list of data items.
 */
const DataListCard: React.FC<CardProps> = ({ title, children, className }) => (
  <div className={cn('bg-white rounded-lg shadow-sm p-4', className)}>
    {title && <SubtitleText className="mb-4">{title}</SubtitleText>}
    <ul className="divide-y divide-gray-200">{children}</ul>
  </div>
);

/**
 * 11. Data List Item
 * A single item within a Data List Card.
 */
const DataListItem: React.FC<BaseProps> = ({ children, className }) => (
  <li className={cn('py-3 flex items-center justify-between', className)}>
    {children}
  </li>
);

/**
 * 12. People List Card
 * A card component designed to hold a list of people.
 */
const PeopleListCard: React.FC<CardProps> = ({ title, children, className }) => (
  <div className={cn('bg-white rounded-lg shadow-sm p-4', className)}>
    {title && <SubtitleText className="mb-4">{title}</SubtitleText>}
    <ul className="divide-y divide-gray-200">{children}</ul>
  </div>
);

/**
 * 13. Person List Item
 * A single item representing a person in a list.
 */
interface PersonListItemProps extends BaseProps {
  name: string;
  role?: string;
  avatarSrc?: string;
}
const PersonListItem: React.FC<PersonListItemProps> = ({ name, role, avatarSrc, className }) => (
  <li className={cn('py-3 flex items-center space-x-3', className)}>
    <Avatar src={avatarSrc} alt={name} size="sm" />
    <div>
      <GenericText className="font-medium text-gray-800">{name}</GenericText>
      {role && <GenericText className="text-sm text-gray-500">{role}</GenericText>}
    </div>
  </li>
);

/**
 * 14. Stat Card
 * Displays a key statistic with an optional icon and trend indicator.
 */
interface StatCardProps extends CardProps {
  value: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendValue, className }) => (
  <div className={cn('bg-white rounded-lg shadow-sm p-5', className)}>
    <div className="flex justify-between items-start mb-2">
      <GenericText className="text-gray-500">{title}</GenericText>
      {icon && <Icon icon={icon} size={20} className="text-gray-400" />}
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
    {trend && trendValue && (
      <div className={cn('flex items-center text-sm', {
        'text-green-500': trend === 'up',
        'text-red-500': trend === 'down',
        'text-gray-500': trend === 'neutral',
      })}>
        {trend === 'up' && <span className="mr-1">&#9650;</span>}
        {trend === 'down' && <span className="mr-1">&#9660;</span>}
        {trendValue}
      </div>
    )}
  </div>
);

/**
 * 6. Bar Chart
 * A container for a bar chart visualization.
 */
const BarChart: React.FC<BaseProps> = ({ children, className }) => (
  <div className={cn('bg-white rounded-lg shadow-sm p-4 h-64 flex flex-col', className)}>
    <SubtitleText className="mb-4">Bar Chart</SubtitleText>
    <div className="flex-grow flex items-end justify-around space-x-2">
      {children}
    </div>
  </div>
);

/**
 * 7. Line Chart
 * A container for a line chart visualization.
 */
const LineChart: React.FC<BaseProps> = ({ children, className }) => (
  <div className={cn('bg-white rounded-lg shadow-sm p-4 h-64', className)}>
    <SubtitleText className="mb-4">Line Chart</SubtitleText>
    <div className="flex-grow flex items-center justify-center text-gray-400">
      <GenericText>Line Chart Visualization Area</GenericText>
      {children}
    </div>
  </div>
);

/**
 * 1. Dashboard Screen
 * The main layout for a dashboard.
 */
const DashboardScreen: React.FC<BaseProps> = ({ children, className }) => (
  <div className={cn('min-h-screen bg-gray-100 p-4', className)}>
    {children}
  </div>
);

// --- AUTH COMPONENTS ---

/**
 * 21. Input Field
 * A standard text input field with an optional label.
 */
const InputField: React.FC<InputProps> = ({ label, id, className, ...props }) => (
  <div className={cn('mb-4', className)}>
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
    )}
    <input
      id={id}
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      {...props}
    />
  </div>
);

/**
 * 56. Legal Disclaimer Text
 * Small text for legal disclaimers.
 */
const LegalDisclaimerText: React.FC<BaseProps> = ({ children, className }) => (
  <p className={cn('text-xs text-gray-500 mt-6 text-center', className)}>
    {children}
  </p>
);

/**
 * 22. Divider with Text
 * A horizontal rule with text centered within it.
 */
interface DividerWithTextProps extends BaseProps {
  text: string;
}
const DividerWithText: React.FC<DividerWithTextProps> = ({ text, className }) => (
  <div className={cn('relative my-6', className)}>
    <div className="absolute inset-0 flex items-center">
      <HorizontalRule className="w-full" />
    </div>
    <div className="relative flex justify-center text-sm">
      <span className="bg-white px-2 text-gray-500">
        {text}
      </span>
    </div>
  </div>
);

/**
 * 23. Social Login Button
 * A button for social login providers (e.g., Google, Facebook).
 */
interface SocialLoginButtonProps extends ButtonProps {
  provider: 'Google' | 'Facebook'; // Only supporting these two for now due to icon availability
}
const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ provider, className, ...props }) => {
  let iconComponent: LucideIcon;
  let bgColor: string;
  let textColor: string;

  switch (provider) {
    case 'Google':
      iconComponent = Google;
      bgColor = 'bg-white hover:bg-gray-50 border border-gray-300';
      textColor = 'text-gray-700';
      break;
    case 'Facebook':
    default:
      iconComponent = Facebook;
      bgColor = 'bg-blue-700 hover:bg-blue-800';
      textColor = 'text-white';
      break;
  }

  return (
    <button
      className={cn('flex items-center justify-center w-full py-2 px-4 rounded-md shadow-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2', bgColor, textColor, className)}
      {...props}
    >
      <Icon icon={iconComponent} size={20} className={cn(provider === 'Google' ? '' : 'mr-2', 'text-current')} />
      {provider === 'Google' ? (
        <span className="ml-2">Sign in with Google</span>
      ) : (
        <span>Sign in with {provider}</span>
      )}
    </button>
  );
};

/**
 * 24. Auth Content Area
 * A container for authentication forms and related content.
 */
const AuthContentArea: React.FC<BaseProps> = ({ children, className }) => (
  <div className={cn('bg-white p-8 rounded-lg shadow-lg max-w-md w-full', className)}>
    {children}
  </div>
);

/**
 * 2. Auth Screen
 * The main layout for authentication pages (login, signup, etc.).
 */
const AuthScreen: React.FC<BaseProps> = ({ children, className }) => (
  <div className={cn('min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8', className)}>
    {children}
  </div>
);

// --- NAVIGATION & GENERAL LAYOUTS ---

/**
 * 18. Top Navigation Bar
 * A horizontal navigation bar typically found at the top of a screen.
 */
const TopNavigationBar: React.FC<BaseProps> = ({ children, className }) => (
  <nav className={cn('bg-white shadow-sm py-3 px-6 flex items-center justify-between', className)}>
    {children}
  </nav>
);

/**
 * 16. Segmented Control
 * A group of buttons that act as a single selection control.
 */
const SegmentedControl: React.FC<BaseProps> = ({ children, className }) => (
  <div className={cn('flex rounded-md bg-gray-200 p-1 space-x-1', className)}>
    {children}
  </div>
);

/**
 * 17. Segmented Control Item
 * A single selectable item within a Segmented Control.
 */
interface SegmentedControlItemProps extends ButtonProps {
  active?: boolean;
}
const SegmentedControlItem: React.FC<SegmentedControlItemProps> = ({ children, active, className, ...props }) => (
  <button
    className={cn(
      'flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200',
      active ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:bg-gray-300',
      className
    )}
    {...props}
  >
    {children}
  </button>
);

/**
 * 31. Sidebar Navigation
 * A vertical navigation panel, typically on the left side of the screen.
 */
const SidebarNavigation: React.FC<BaseProps> = ({ children, className }) => (
  <aside className={cn('w-64 bg-gray-800 text-white flex flex-col p-4 h-screen', className)}>
    {children}
  </aside>
);

/**
 * 32. Sidebar Menu Item
 * A single clickable item within the Sidebar Navigation.
 */
interface SidebarMenuItemProps extends ButtonProps {
  icon?: LucideIcon;
  active?: boolean;
}
const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ icon, children, active, className, ...props }) => (
  <button
    className={cn(
      'flex items-center space-x-3 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200',
      active ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700',
      className
    )}
    {...props}
  >
    {icon && <Icon icon={icon} size={20} className="text-current" />}
    <span>{children}</span>
  </button>
);

// --- TASK LIST COMPONENTS ---

/**
 * 28. Tag Pill
 * A small, rounded label for categorizing or tagging items.
 */
interface TagPillProps extends BaseProps {
  color?: 'gray' | 'blue' | 'green' | 'red' | 'orange';
}
const TagPill: React.FC<TagPillProps> = ({ children, color = 'gray', className }) => {
  const bgColorClass = `bg-${color}-100`;
  const textColorClass = `text-${color}-800`;
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', bgColorClass, textColorClass, className)}>
      {children}
    </span>
  );
};

/**
 * 25. Task Table
 * A container for displaying a list of tasks in a table-like format.
 */
const TaskTable: React.FC<BaseProps> = ({ children, className }) => (
  <div className={cn('bg-white rounded-lg shadow-sm overflow-hidden', className)}>
    <div className="min-w-full divide-y divide-gray-200">
      {children}
    </div>
  </div>
);

/**
 * 26. Task Table Header
 * The header row for a Task Table.
 */
interface TaskTableHeaderProps extends BaseProps {
  columns: string[];
}
const TaskTableHeader: React.FC<TaskTableHeaderProps> = ({ columns, className }) => (
  <div className={cn('bg-gray-50 grid grid-cols-5 py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider', className)}>
    {columns.map((col, index) => (
      <span key={index}>{col}</span>
    ))}
  </div>
);

/**
 * 27. Task List Item
 * A single row item in the Task Table.
 */
interface TaskListItemProps extends BaseProps {
  title: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
  assignedTo: string;
  priority: 'Low' | 'Medium' | 'High';
}
const TaskListItem: React.FC<TaskListItemProps> = ({ title, status, dueDate, assignedTo, priority, className }) => (
  <div className={cn('grid grid-cols-5 py-4 px-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150', className)}>
    <GenericText className="font-medium text-gray-900">{title}</GenericText>
    <TagPill color={status === 'Completed' ? 'green' : status === 'In Progress' ? 'blue' : 'gray'}>
      {status}
    </TagPill>
    <GenericText>{dueDate}</GenericText>
    <GenericText>{assignedTo}</GenericText>
    <TagPill color={priority === 'High' ? 'red' : priority === 'Medium' ? 'orange' : 'gray'}>
      {priority}
    </TagPill>
  </div>
);

/**
 * 29. Task List Toolbar
 * A toolbar for actions related to a task list (e.g., filters, add buttons).
 */
const TaskListToolbar: React.FC<BaseProps> = ({ children, className }) => (
  <div className={cn('flex items-center justify-between p-4 bg-white rounded-t-lg border-b border-gray-200', className)}>
    {children}
  </div>
);

/**
 * 30. Filter Button
 * A button specifically for applying filters.
 */
const FilterButton: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button
    className={cn('flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200', className)}
    {...props}
  >
    <Filter size={18} />
    <span>{children || 'Filter'}</span>
  </button>
);

/**
 * 3. Task List Screen
 * The main layout for the task list.
 */
const TaskListScreen: React.FC<BaseProps> = ({ children, className }) => (
  <div className={cn('min-h-screen bg-gray-100 p-4', className)}>
    {children}
  </div>
);

// --- MUSIC COMPONENTS ---

/**
 * 34. Section Header
 * A header for a section, often with a title and optional actions.
 */
const SectionHeader: React.FC<BaseProps> = ({ children, className }) => (
  <div className={cn('flex items-center justify-between mb-4', className)}>
    {children}
  </div>
);

/**
 * 33. Album Card
 * A card displaying album information (cover, title, artist).
 */
interface AlbumCardProps extends CardProps {
  imageUrl: string;
  artist: string;
}
const AlbumCard: React.FC<AlbumCardProps> = ({ title, artist, imageUrl, className }) => (
  <div className={cn('bg-white rounded-lg shadow-sm overflow-hidden p-4 text-center', className)}>
    <img src={imageUrl} alt={title} className="w-full h-40 object-cover rounded-md mb-3" />
    <GenericText className="font-semibold text-gray-900 mb-1">{title}</GenericText>
    <GenericText className="text-sm text-gray-600">{artist}</GenericText>
  </div>
);

/**
 * 35. Playlist Card
 * A card displaying playlist information (cover, title, item count).
 */
interface PlaylistCardProps extends CardProps {
  imageUrl: string;
  itemCount: number;
}
const PlaylistCard: React.FC<PlaylistCardProps> = ({ title, imageUrl, itemCount, className }) => (
  <div className={cn('bg-white rounded-lg shadow-sm overflow-hidden p-4 text-center', className)}>
    <img src={imageUrl} alt={title} className="w-full h-40 object-cover rounded-md mb-3" />
    <GenericText className="font-semibold text-gray-900 mb-1">{title}</GenericText>
    <GenericText className="text-sm text-gray-600">{itemCount} songs</GenericText>
  </div>
);

/**
 * 36. Sidebar Category Title
 * A title for categories within a sidebar menu.
 */
const SidebarCategoryTitle: React.FC<BaseProps> = ({ children, className }) => (
  <h3 className={cn('text-xs font-semibold uppercase tracking-wider text-gray-400 mt-4 mb-2 px-3', className)}>
    {children}
  </h3>
);

/**
 * 4. Music Screen
 * The main layout for the music application.
 */
const MusicScreen: React.FC<BaseProps> = ({ children, className }) => (
  <div className={cn('min-h-screen bg-gray-100 flex', className)}>
    {children}
  </div>
);

// --- CHAT COMPONENTS ---

/**
 * 37. Chat Profile Panel
 * A panel typically on the right side of a chat interface displaying contact profile.
 */
const ChatProfilePanel: React.FC<BaseProps> = ({ children, className }) => (
  <div className={cn('w-80 bg-white border-l border-gray-200 flex flex-col p-4', className)}>
    {children}
  </div>
);

/**
 * 38. Chat Profile Menu
 * A list of menu items within the Chat Profile Panel.
 */
const ChatProfileMenu: React.FC<BaseProps> = ({ children, className }) => (
  <ul className={cn('mt-6 space-y-2', className)}>
    {children}
  </ul>
);

/**
 * 39. Chat Profile Menu Item
 * A single clickable item in the Chat Profile Menu.
 */
interface ChatProfileMenuItemProps extends ButtonProps {
  icon: LucideIcon;
}
const ChatProfileMenuItem: React.FC<ChatProfileMenuItemProps> = ({ icon, children, className, ...props }) => (
  <li>
    <button
      className={cn('flex items-center space-x-3 w-full text-left py-2 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150', className)}
      {...props}
    >
      <Icon icon={icon} size={18} className="text-gray-500" />
      <span>{children}</span>
    </button>
  </li>
);

/**
 * 40. Person Info Display
 * Displays a person's avatar, name, and status.
 */
interface PersonInfoDisplayProps extends BaseProps {
  name: string;
  status?: 'Online' | 'Offline' | 'Away';
  avatarSrc?: string;
}
const PersonInfoDisplay: React.FC<PersonInfoDisplayProps> = ({ name, status, avatarSrc, className }) => (
  <div className={cn('flex flex-col items-center text-center py-4 border-b border-gray-200', className)}>
    <Avatar src={avatarSrc} alt={name} size="xl" className="mb-3" />
    <TitleText className="text-xl mb-1">{name}</TitleText>
    {status && (
      <GenericText className={cn('text-sm', {
        'text-green-500': status === 'Online',
        'text-yellow-500': status === 'Away',
        'text-gray-500': status === 'Offline'
      })}>
        {status === 'Online' && <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>}
        {status}
      </GenericText>
    )}
  </div>
);

/**
 * 47. Chat Header
 * The header for an active chat conversation.
 */
interface ChatHeaderProps extends BaseProps {
  chatTitle: string;
  subtitle?: string;
  avatarSrc?: string;
}
const ChatHeader: React.FC<ChatHeaderProps> = ({ chatTitle, subtitle, avatarSrc, children, className }) => (
  <div className={cn('flex items-center justify-between p-4 border-b border-gray-200 bg-white', className)}>
    <div className="flex items-center space-x-3">
      <Avatar src={avatarSrc} alt={chatTitle} size="md" />
      <div>
        <SubtitleText className="mb-0">{chatTitle}</SubtitleText>
        {subtitle && <GenericText className="text-sm text-gray-500">{subtitle}</GenericText>}
      </div>
    </div>
    <div className="flex space-x-2">
      {children}
    </div>
  </div>
);

/**
 * 46. Chat Date Separator
 * A separator displaying a date in a chat message list.
 */
const ChatDateSeparator: React.FC<BaseProps> = ({ children, className }) => (
  <div className={cn('relative my-6 text-center', className)}>
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-200"></div>
    </div>
    <div className="relative inline-flex justify-center text-xs text-gray-500 bg-gray-50 px-3">
      {children}
    </div>
  </div>
);

/**
 * 45. Chat Message Bubble
 * The visual bubble containing a chat message.
 */
const ChatMessageBubble: React.FC<BaseProps> = ({ children, className }) => (
  <div className={cn('max-w-xs p-3 rounded-xl break-words', className)}>
    <GenericText className="text-sm">{children}</GenericText>
  </div>
);

/**
 * 44. Chat Message Bubble Group
 * A group of chat message bubbles from a single sender, often including an avatar and timestamp.
 */
interface ChatMessageBubbleGroupProps extends BaseProps {
  isSender?: boolean; // true if the message is from the current user
  avatarSrc?: string;
  timestamp?: string;
}
const ChatMessageBubbleGroup: React.FC<ChatMessageBubbleGroupProps> = ({ isSender, avatarSrc, timestamp, children, className }) => (
  <div className={cn('flex items-start gap-3', isSender ? 'justify-end' : '', className)}>
    {!isSender && <Avatar src={avatarSrc} size="sm" alt="Sender" />}
    <div className={cn('flex flex-col', isSender ? 'items-end' : 'items-start')}>
      <div className={cn('flex', isSender ? 'justify-end' : 'justify-start')}>
        {/* Child is expected to be ChatMessageBubble */}
        {children}
      </div>
      {timestamp && (
        <GenericText className={cn('text-xs text-gray-500 mt-1', isSender ? 'text-right' : 'text-left')}>
          {timestamp}
        </GenericText>
      )}
    </div>
    {isSender && <Avatar src={avatarSrc} size="sm" alt="Me" />}
  </div>
);

/**
 * 43. Chat Message List
 * The container for all message bubbles in a conversation.
 */
const ChatMessageList: React.FC<BaseProps> = ({ children, className }) => (
  <div className={cn('flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50', className)}>
    {children}
  </div>
);

/**
 * 42. Chat Reply Input
 * An input field for typing and sending chat messages.
 */
interface ChatReplyInputProps extends InputProps {
  onSend?: (message: string) => void;
}
const ChatReplyInput: React.FC<ChatReplyInputProps> = ({ className, onSend, ...props }) => {
  const [message, setMessage] = React.useState('');

  const handleSend = () => {
    if (message.trim() && onSend) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={cn('flex items-center p-4 border-t border-gray-200 bg-white', className)}>
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        {...props}
      />
      <IconButton
        icon={Send}
        onClick={handleSend}
        className="ml-3 bg-blue-600 text-white hover:bg-blue-700"
        iconSize={20}
      />
    </div>
  );
};

/**
 * 41. Chat Conversation Area
 * The main area displaying a chat conversation, including header, messages, and input.
 */
const ChatConversationArea: React.FC<BaseProps> = ({ children, className }) => (
  <div className={cn('flex-1 flex flex-col h-full', className)}>
    {children}
  </div>
);

/**
 * 50. Chat List Item
 * A single item in the chat list, representing a conversation.
 */
interface ChatListItemProps extends BaseProps {
  avatarSrc?: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  active?: boolean;
}
const ChatListItem: React.FC<ChatListItemProps> = ({ avatarSrc, name, lastMessage, time, unreadCount, active, className }) => (
  <li className={cn(
    'flex items-center p-3 space-x-3 cursor-pointer hover:bg-gray-100 transition-colors duration-150',
    active ? 'bg-blue-50' : '',
    className
  )}>
    <Avatar src={avatarSrc} alt={name} size="md" />
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center">
        <GenericText className="font-medium text-gray-900 truncate">{name}</GenericText>
        <GenericText className="text-xs text-gray-500">{time}</GenericText>
      </div>
      <div className="flex justify-between items-center mt-1">
        <GenericText className="text-sm text-gray-600 truncate">{lastMessage}</GenericText>
        {unreadCount && unreadCount > 0 && (
          <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold bg-blue-500 text-white rounded-full">
            {unreadCount}
          </span>
        )}
      </div>
    </div>
  </li>
);

/**
 * 49. Chat List
 * A scrollable list of chat conversations.
 */
const ChatList: React.FC<BaseProps> = ({ children, className }) => (
  <ul className={cn('divide-y divide-gray-200 overflow-y-auto', className)}>
    {children}
  </ul>
);

/**
 * 48. Chat List Panel
 * The left-hand panel in a chat interface, containing the list of conversations.
 */
const ChatListPanel: React.FC<BaseProps> = ({ children, className }) => (
  <div className={cn('w-80 bg-white border-r border-gray-200 flex flex-col', className)}>
    <div className="p-4 border-b border-gray-200">
      <SearchInput placeholder="Search chats..." />
    </div>
    {children}
  </div>
);

/**
 * 5. Chat Screen
 * The main layout for the chat application.
 */
const ChatScreen: React.FC<BaseProps> = ({ children, className }) => (
  <div className={cn('min-h-screen bg-gray-100 flex', className)}>
    {children}
  </div>
);

// Export all components
export {
  DashboardScreen, AuthScreen, TaskListScreen, MusicScreen, ChatScreen,
  BarChart, LineChart, ChartAxisLabel, ChartBar,
  DataListCard, DataListItem, PeopleListCard, PersonListItem, StatCard,
  SearchInput, SegmentedControl, SegmentedControlItem, TopNavigationBar,
  IconButton, PrimaryButton, InputField, DividerWithText, SocialLoginButton,
  AuthContentArea, TaskTable, TaskTableHeader, TaskListItem, TagPill,
  TaskListToolbar, FilterButton, SidebarNavigation, SidebarMenuItem,
  AlbumCard, SectionHeader, PlaylistCard, SidebarCategoryTitle,
  ChatProfilePanel, ChatProfileMenu, ChatProfileMenuItem, PersonInfoDisplay,
  ChatConversationArea, ChatReplyInput, ChatMessageList, ChatMessageBubbleGroup,
  ChatMessageBubble, ChatDateSeparator, ChatHeader, ChatListPanel, ChatList,
  ChatListItem, Avatar, Icon, TitleText, SubtitleText, GenericText,
  LegalDisclaimerText, AppTitle, HorizontalRule
};
```