import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

export function DraggableCardsSection() {
  const items = [
    {
      title: "Premium Quality",
      image: "/1.jpg?height=320&width=320",
      className:
        "absolute top-28 left-[0%] lg:top-16 lg:left-[15%] rotate-[-5deg]",
    },
    {
      title: "Sustainable Materials",
      image: "/2.jpg?height=320&width=320",
      className:
        "absolute bottom-44 left-[0%] lg:bottom-32 lg:left-[10%] rotate-[-7deg]",
    },
    {
      title: "Perfect Fit",
      image: "/3.jpg?height=320&width=320",
      className:
        "absolute top-40 left-[40%] lg:top-12 lg:left-[55%] rotate-[8deg]",
    },
    {
      title: "Beach Ready",
      image: "/7.jpg?height=320&width=320",
      className:
        "absolute top-56 left-[20%] lg:top-24 lg:left-[40%] rotate-[10deg]",
    },
    {
      title: "East Coast Energy",
      image: "/5.jpg?height=320&width=320",
      className:
        "absolute bottom-40 left-[35%] lg:bottom-24 lg:left-[50%] rotate-[2deg]",
    },
    {
      title: "Summer Vibes",
      image: "/6.jpg?height=320&width=320",
      className:
        "absolute bottom-28 left-[10%] lg:bottom-16 lg:left-[25%] rotate-[2deg]",
    },
  ];

  return (
    <DraggableCardContainer className="relative flex min-h-screen w-full flex-wrap items-center justify-center overflow-hidden px-4 sm:px-8">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 text-center z-0">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-neutral-300 dark:text-neutral-700 max-w-md">
          Dive into luxury with Winnie Swim
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-neutral-400 dark:text-neutral-600 mt-4 max-w-sm">
          Premium swimwear designed for the modern woman
        </p>
      </div>
      {items.map((item, index) => (
        <DraggableCardBody key={index} className={item.className}>
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            className="pointer-events-none relative z-10 h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 object-cover rounded-lg"
          />
          <h3
            className="mt-6 text-center text-lg sm:text-xl font-bold text-neutral-700 dark:text-neutral-300"
            style={{ fontFamily: "var(--font-hopeless-romantic)" }}
          >
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
