import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Divider, Group } from "@mantine/core";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  let links = (
    <div className="links">
      <Link href="/">
        <a className="bold" data-active={isActive("/")}>
          Submit New Support Ticket
        </a>
      </Link>
      <Link href="/ticket-list">
        <a className="bold" data-active={isActive("/ticket-list")}>
          View All Support Tickets
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: #0000FF;
          display: inline-block;
        }

        .links a[data-active="true"] {
          color: gray;
          text-decoration: underline;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  return (
    <>
      <Group mx={50} pt={25}>
        {links}
      </Group>
      <Divider my="md" />
    </>
  );
};

export default Header;
