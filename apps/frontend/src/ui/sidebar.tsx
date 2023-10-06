import { useState } from 'react';
import { createStyles, Navbar, Group, Code, getStylesRef, rem } from '@mantine/core';
import { IconSwitchHorizontal, IconLogout, TablerIconsProps, IconBrandGithub } from '@tabler/icons-react';
import { ReactComponent as Logo } from './logo.svg';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
  },

  version: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
      0.1,
    ),
    color: theme.white,
    fontWeight: 700,
  },

  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
      0.1,
    )}`,
  },

  logo: {
    color: 'white',
    fontSize: theme.fontSizes.sm,
    fontWeight: 700,
    letterSpacing: -0.3,
  },

  footer: {
    fontSize: theme.fontSizes.xs,
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
      0.1,
    )}`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.xs,
    color: theme.white,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
        0.1,
      ),
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.white,
    opacity: 0.75,
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
        0.15,
      ),
      [`& .${getStylesRef('icon')}`]: {
        opacity: 0.9,
      },
    },
  },
}));

type SidebarItem = {
  link: string;
  label: string;
  icon: (props: TablerIconsProps) => JSX.Element;
};

type Props = {
  items: SidebarItem[];
};

export function Sidebar({ items }: Props) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Billing');

  const links = items.map((item) => (
    <Link
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      to={item.link}
      key={item.label}
      onClick={(event) => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} size={16} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <Navbar height={'100vh'} width={{ sm: 250 }} p="md" className={classes.navbar}>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <div className={classes.logo}>fetching libraries</div>
          <Code className={classes.version}>v0.0.1</Code>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a href="https://github.com/karlosos/fetching-casestudy" className={classes.link}>
          <IconBrandGithub className={classes.linkIcon} stroke={1.5} size={16} />
          <span>Source Code</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
