import { Heart } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex gap-2 items-center justify-center">
      Built with <Heart className="h-4 w-4 text-red-500" /> in Next.js
    </footer>
  );
};

export default Footer;
