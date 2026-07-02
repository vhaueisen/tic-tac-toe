import { motion } from "framer-motion";
import { GitBranch } from "lucide-react";

type GitHubRepoButtonProps = {
  href: string;
  className?: string;
};

export function GitHubRepoButton({ href, className }: GitHubRepoButtonProps) {
  const buttonClassName = ["github-repo-button", className].filter(Boolean).join(" ");

  return (
    <motion.a
      className={buttonClassName}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Open the Tic Tac Toe repository on GitHub"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
    >
      <GitBranch aria-hidden="true" className="github-repo-button__icon" />
      <span>GitHub</span>
    </motion.a>
  );
}
