import { motion } from "framer-motion";

type GitHubRepoButtonProps = {
  href: string;
};

export function GitHubRepoButton({ href }: GitHubRepoButtonProps) {
  return (
    <motion.a
      className="github-repo-button"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Open the Tic Tac Toe repository on GitHub"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        focusable="false"
        className="github-repo-button__icon"
      >
        <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 5.78c1.02 0 2.05.14 3.01.41 2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
      </svg>
      <span>GitHub</span>
    </motion.a>
  );
}
