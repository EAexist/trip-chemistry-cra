/* Material UI. Material UI - Guides - Serever rendering 
( https://mui.com/material-ui/guides/server-rendering/#handling-the-request ) */
import createCache from '@emotion/cache';

export default function createEmotionCache() {
    return createCache({ key: 'css' });
}