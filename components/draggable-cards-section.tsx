import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

export function DraggableCardsSection() {
  const items = [
    {
      title: "Premium Quality",
      image: "/1.jpg?height=320&width=320",
      className: "absolute top-10 left-[10%] rotate-[-5deg]",
    },
    {
      title: "Sustainable Materials",
      image: "/2.jpg?height=320&width=320",
      className: "absolute top-40 left-[15%] rotate-[-7deg]",
    },
    {
      title: "Perfect Fit",
      image: "/3.jpg?height=320&width=320",
      className: "absolute top-5 left-[30%] rotate-[8deg]",
    },
    {
      title: "Beach Ready",
      image: "/5.jpg?height=320&width=320",
      className: "absolute top-32 left-[45%] rotate-[10deg]",
    },
    {
      title: "Summer Vibes",
      image: "/6.jpg?height=320&width=320",
      className: "absolute top-20 right-[25%] rotate-[2deg]",
    },
  ];

  return (
    <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 text-center z-0">
        <h2 className="text-3xl md:text-5xl font-black text-neutral-300 dark:text-neutral-700 max-w-md">
          Dive into luxury with Winnie Swim
        </h2>
        <p className="text-lg md:text-xl text-neutral-400 dark:text-neutral-600 mt-4 max-w-sm">
          Premium swimwear designed for the modern woman
        </p>
      </div>
      {items.map((item, index) => (
        <DraggableCardBody key={index} className={item.className}>
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            className="pointer-events-none relative z-10 h-64 w-64 object-cover rounded-lg"
          />
          <h3
            className="mt-4 text-center text-xl font-bold text-neutral-700 dark:text-neutral-300"
            style={{ fontFamily: "var(--font-UTScript)" }}
          >
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
