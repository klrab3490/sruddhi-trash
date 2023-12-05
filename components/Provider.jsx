'use client';

import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }) => (
    <SessionProvider session={session}>
        <center>
        {children}
        </center>
  </SessionProvider>
)

export default Provider;