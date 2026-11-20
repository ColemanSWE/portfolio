'use client';

import { useState } from 'react';

export default function CopyEmail({ email }: { email: string }) {
  const [label, setLabel] = useState('Copy email');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setLabel('Copied');
    } catch {
      setLabel('Select it above');
    }
    window.setTimeout(() => setLabel('Copy email'), 1800);
  };

  return (
    <button className="btn" type="button" onClick={copy}>
      {label}
    </button>
  );
}
