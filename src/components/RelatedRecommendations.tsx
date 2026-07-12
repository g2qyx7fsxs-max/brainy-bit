import { RelatedBook, RelatedEvent } from "@/lib/content";

export function RelatedRecommendations({
  books,
  events,
}: {
  books?: RelatedBook[];
  events?: RelatedEvent[];
}) {
  if (!books?.length && !events?.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {books?.length ? (
        <div className="rounded-2xl bg-gray-50 p-5">
          <p className="mb-3 text-sm font-bold text-gray-900">📚 If you liked this, read...</p>
          <ul className="space-y-2 text-sm text-gray-700">
            {books.map((book) => (
              <li key={book.title}>
                <span className="font-medium">{book.title}</span>
                <span className="text-gray-500"> — {book.author}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {events?.length ? (
        <div className="rounded-2xl bg-gray-50 p-5">
          <p className="mb-3 text-sm font-bold text-gray-900">📅 Related real-world stuff</p>
          <ul className="space-y-2 text-sm text-gray-700">
            {events.map((event) => (
              <li key={event.name}>
                <span className="font-medium">{event.name}</span>
                <span className="text-gray-500"> — {event.description}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
