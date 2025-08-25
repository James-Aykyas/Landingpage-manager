import PreviewContent from "./previewContent";

interface PreviewPageProps {
  params: { id: string };
}

export default function PreviewPage({ params }: PreviewPageProps) {
  return <PreviewContent id={params.id} />;
}

// static export ke liye required
export async function generateStaticParams() {
  return [];
}