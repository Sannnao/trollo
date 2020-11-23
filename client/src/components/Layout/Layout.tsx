import React from 'react'
import {
  Header,
} from '..';

type LayoutProps = {
  children: React.ReactElement;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='layout'>
      <Header />
      <main className='layout__main'>
        {children}
      </main>
    </div>
  )
}
