import React, { useEffect, useState } from "react";

interface DelayMountProps {
  delay?: number;
  children: React.ReactNode;
}

export default function DelayMount({ delay = 0, children }: DelayMountProps) {
  const [show, setShow] = useState(delay === 0);

  useEffect(() => {
    if (delay === 0) return;
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return show ? children : null;
}
