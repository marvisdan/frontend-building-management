import { useState } from "react";

// ----------------------------------------------------------------------

export type CopiedValue = string | null;

export type CopyFn = (text: string) => Promise<boolean>;

export type ReturnType = {
  copy: CopyFn;
  copiedText: CopiedValue;
  error: string | null;
};

function useCopyToClipboard(): ReturnType {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);
  const [error, setError] = useState<string | null>(null);

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      setError("Clipboard not supported");

      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      setCopiedText(null);
      setError("Copy failed");
      return false;
    }
  };

  return { copiedText, copy, error };
}

export default useCopyToClipboard;
