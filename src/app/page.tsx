"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { RoomProvider, useThreads, useOthers, useSelf  } from "@liveblocks/react/suspense";
import { Loading } from "../components/Loading";
import { Composer, Thread } from "@liveblocks/react-ui";
import { ClientSideSuspense } from "@liveblocks/react";
import { ErrorBoundary } from "react-error-boundary";
import { getUser } from "./lib/getUser";

import "./../styles/avatar.css";
import { Header } from "../components/Header";
/**
 * Displays a list of threads, along with a composer for creating
 * new threads.
 */

function Example() {
  const { threads } = useThreads();
  const users = useOthers();
  const currentUser = useSelf();
  const getUserDetails = users.map(({id}) => getUser(id))
  const getCurrentUserDetails = getUser(currentUser.id)

  return (
    <main>
    <div className="avatar-row">
      {[getCurrentUserDetails, ...getUserDetails].map((user, index) => (
        <img
          key={index}
          src={user?.avatar}
          alt={user?.name}
          className="avatar"
          style={{ zIndex: 100 - index }}
        />
      ))}
    </div>
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} className="thread" />
      ))}
      <Composer className="composer" />
    </main>
  );
}

export default function Page() {
  const roomId = useExampleRoomId("liveblocks:examples:nextjs-comments");

  return (
    <RoomProvider id={roomId}>
      <ErrorBoundary
        fallback={
          <div className="error">There was an error while getting threads.</div>
        }
      >
        <ClientSideSuspense fallback={<Loading />}>
        <Header/>
          <Example />
        </ClientSideSuspense>
      </ErrorBoundary>
    </RoomProvider>
  );
}

/**
 * This function is used when deploying an example on liveblocks.io.
 * You can ignore it completely if you run the example locally.
 */
function useExampleRoomId(roomId: string) {
  const params = useSearchParams();
  const exampleId = params?.get("exampleId");

  const exampleRoomId = useMemo(() => {
    return exampleId ? `${roomId}-${exampleId}` : roomId;
  }, [roomId, exampleId]);

  return exampleRoomId;
}
