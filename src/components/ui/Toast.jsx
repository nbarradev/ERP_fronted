import { useEffect } from 'react';
import { IconCheck } from '@tabler/icons-react';

export default function Toast({ message, visible }) {
  if (!visible || !message) return null;
  return (
    <div className="toast">
      <IconCheck size={16} stroke={2.5} />
      <span>{message}</span>
    </div>
  );
}
