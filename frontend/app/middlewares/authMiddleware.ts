import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';

export function withAuthMiddleware(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const url = request.url;
    console.log('authMiddleware1=>', { url });

    return middleware(request, event);
  };
}
