import { FaRegCommentDots } from "react-icons/fa";

interface MessageIconProps {
  count: number;
}

const MessageIcon = ({ count }: MessageIconProps) => {
  return (
    <div className="relative inline-block">
      <FaRegCommentDots className="w-14 h-14 text-gray-100" />

      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-sm font-bold flex items-center justify-center w-7 h-7 rounded-full shadow-md">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </div>
  );
};

export default MessageIcon;
