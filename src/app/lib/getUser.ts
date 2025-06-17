import { NAMES, AI_USER_ID } from "../../database";

/**
 * Get users' info from their ID
 * For `resolveUsers` in liveblocks.config.ts
 */

export function getUser(userId: string) {
  if (!userId.startsWith("user-")) {
    return {
    name: AI_USER_ID,
    avatar: `ai-avatar.png`,
  };
  }

  const userIndex = Number(userId.replace(/^\D+/g, "")) ?? 0;

  return {
    name: NAMES[userIndex],
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${NAMES[userIndex]}`,
  };
}