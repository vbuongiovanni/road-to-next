## Caching strategies

There is a spectrum to caching - on one end, we have fully static rendering, where the page will always be the exact same from build time, to fully dynamic, which is where the entire page/component is rendered at runtime. In between you have static rendering with on-demand or time-based caching.

Here are some examples when to use which caching strategy:

- **Static Rendering**: Use static rendering when you have a page that does not change often. This is useful for pages that contain static data like a blog post or a product page. Or, data that doesn't necessarily have to be visible in real time. Consider Robin's example where he shows the number of purchases he has... This number is only updated at build time and otherwise will show the same number.

- **Dynamic Rendering**: Use dynamic rendering when you have a page that changes often. This is useful for pages that contain dynamic data like a dashboard or a real-time collaboration tool.

- **Prefetch Cache**: Use prefetch caching when you want to improve the performance of client-side navigations. This is useful for pages that contain data that is linked to other pages like a real-time collaboration tool or a public API.

- **Time-Based Caching (ISR)**: Use time-based caching when you have a page that needs to be updated at runtime. This is useful for pages that contain data that changes frequently like a news feed or a leaderboard but can be cached for a certain amount of time.

- **On-Demand Caching (ISR)**: Use on-demand caching when you want to forcibly purge the cache response. This is useful for pages that contain data that needs to be updated after a certain event has occurred like an e-commerce page or an admin panel. Additionally, it's useful to bind with user actions, such as adding or removing existing documents/records.

- **Request Memoization**: Use request memoization when you want to cache the response from requests made with fetch. This is useful for components that make multiple requests to the server during a user's request.

- **Generate Static Params**: Use generateStaticParams when you want to cache the result of a dynamic page at build time. This is _may_ useful for pages that contain data that is not frequently accessed like a detail page of a ticket. Or, if you have dynamic elements that rarely change.
