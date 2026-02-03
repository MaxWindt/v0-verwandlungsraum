declare module "react-scroll" {
  import * as React from "react";
  export interface LinkProps {
    to: string;
    spy?: boolean;
    smooth?: boolean;
    offset?: number;
    duration?: number;
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
  }
  export const Link: React.FC<LinkProps>;
  export { Link as ScrollLink };
}