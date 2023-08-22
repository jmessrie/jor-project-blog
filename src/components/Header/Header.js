'use client';
import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Rss, Sun, Moon } from 'react-feather';

import {
  LIGHT_TOKENS,
  DARK_TOKENS,
  COLOR_THEME_COOKIE_NAME,
} from '@/constants';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './Header.module.css';
import Cookie from 'js-cookie';

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme);
  const handleModeClick = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    Cookie.set(COLOR_THEME_COOKIE_NAME, nextTheme, { expires: 1000 });
    const root = document.documentElement;
    const tokens = nextTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;
    root.setAttribute('data-color-theme', nextTheme);
    Object.entries(tokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };
  const ModeIcon =
    theme === 'light' ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />;

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <Link href="/rss.xml" className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </Link>
        <button className={styles.action} onClick={handleModeClick}>
          {ModeIcon}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
