"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { EmptyState } from "@/components/pt/empty-state";
import { useFeedbackThreads } from "@/hooks/useFeedback";
import { getKlienById } from "@/lib/mock/klien";
import { AthleteCard } from "./athlete-card";
import { Composer } from "./composer";
import { ThreadList } from "./thread-list";

// Master-detail Feedback Center (design/FEEDBACK.md §1).
export function FeedbackView({
  initialKlienId,
}: {
  initialKlienId: number | null;
}) {
  const { data } = useFeedbackThreads();
  const [selectedKlienId, setSelectedKlienId] = useState<number | null>(
    initialKlienId
  );

  const klien = selectedKlienId ? getKlienById(selectedKlienId) : undefined;
  const thread = data?.find((item) => item.klienId === selectedKlienId);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <ThreadList
          selectedKlienId={selectedKlienId}
          onSelect={setSelectedKlienId}
        />
      </div>

      <div className="lg:col-span-8">
        {klien && thread ? (
          <div className="space-y-6">
            <AthleteCard klien={klien} thread={thread} />
            <Composer klien={klien} />
          </div>
        ) : (
          <EmptyState
            icon={<MessageSquare />}
            title="Pilih klien"
            description="Pilih percakapan klien di sebelah kiri untuk mulai menulis feedback."
          />
        )}
      </div>
    </div>
  );
}
