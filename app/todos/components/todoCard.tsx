"use client";

import { Card, CardTitle } from "@/components/ui/card";

export default function TodoCard(props: { title: string; id: number }) {
  return (
    <Card
      className="w-48 h-48 flex items-center"
      onClick={() => {
        window.location.href = `/todos/${props.id}`;
      }}
    >
      <CardTitle>{props.title}</CardTitle>
    </Card>
  );
}
