import EntryDetailClient from "./EntryDetailClient";

export default function GratitudeEntryDetailPage({ params }) {
  return <EntryDetailClient id={params.id} />;
}
