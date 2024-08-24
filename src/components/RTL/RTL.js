import React from 'react'
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

const RTL = ({children}) => {
  return (
    <CacheProvider value={cacheRtl}>
        {children}
    </CacheProvider>
  )
}

export default RTL