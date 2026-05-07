
import React from 'react';

export const PlaceHolderUser = React.lazy(async () => ({
    default: (await import('./img/placeholder-logo.svg') as any),
}));
