// TODO: Implement role-based authorization middleware.
// This file is empty. Here's what you need to build:
// 
// 1. Extract guild ID and user ID from the request.
// 2. Query prisma.discordGuildMembers to find the user's roles in that guild.
// 3. Define role hierarchy: MEMBER < EVENT_TEAM < EVENT_LEAD < ADMIN.
// 4. Check if user's role meets minimum required role for the endpoint.
// 5. If yes, call next(); if no, return 403 Forbidden.
// 
// Example signature:
// export function requireGuildRole(minRole: DiscordGuildRole) {
//   return async (req: AuthenticatedRequest, res, next) => {
//     // TODO: implement
//   };
// }
// 
// Endpoints that need this:
// - POST /api/discord/guilds/:guildId/events (EVENT_TEAM or higher)
// - PUT /api/discord/events/:eventId (EVENT_LEAD or higher)
// - DELETE /api/discord/events/:eventId (ADMIN)
// 
// Add checks before route handlers: