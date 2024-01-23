"use client";

import { useAuth } from "@clerk/nextjs";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { onFollow, unFollow } from "@/actions/follow";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
}

export const Actions = ({
  hostIdentity,
  isFollowing,
  isHost,
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const { userId } = useAuth()

    const handleFollow = () => {
        onFollow(hostIdentity)
        .then((data) => toast.success(`You are now following ${data.following.username}`))
        .catch(() => toast.error("something went wrong"))
    }

    const handleUnfollow = () => {
        unFollow(hostIdentity)
        .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
        .catch(() => toast.error("something went wrong"))
    }

    const toggleFollow = () => {
        if (!userId) {
           return router.push("/sign-in")
        }

        if (isHost) return;

        if(isFollowing) {
            {handleUnfollow}
        } else {
            {handleFollow}
        }
    }

  return (
    <div>
      <Button
        disabled={isPending || isHost}
        onClick={toggleFollow}
        variant="primary"
        size="sm"
        className="w-full lg:w-auto"
      >
        <Heart className={cn(
            "h-4 w-4 mr-2",
            isFollowing ? "fill-white" : "fill-none"
        )} />
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};

export const ActionsSkeleton = () => {
    return (
        <Skeleton className="h-10 w-full lg:w-24"/>
    )
}