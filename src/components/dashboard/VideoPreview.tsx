import { Button } from '../ui/Button';

interface VideoPreviewProps {
  title: string;
}

export function VideoPreview({ title }: VideoPreviewProps) {
  return (
    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-100 border border-border shadow-sm">
      <div className="absolute inset-0 p-3">
        <div className="h-full w-full rounded-lg bg-black/90 flex items-center justify-center">
          <div className="flex items-end gap-1 h-10">
            <span className="w-1.5 h-3 bg-primary-400 animate-[bounce_1s_ease-in-out_infinite]" />
            <span className="w-1.5 h-6 bg-primary-500 animate-[bounce_1s_ease-in-out_infinite_0.15s]" />
            <span className="w-1.5 h-4 bg-primary-400 animate-[bounce_1s_ease-in-out_infinite_0.3s]" />
            <span className="w-1.5 h-7 bg-primary-600 animate-[bounce_1s_ease-in-out_infinite_0.45s]" />
            <span className="w-1.5 h-5 bg-primary-500 animate-[bounce_1s_ease-in-out_infinite_0.6s]" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent">
        <div className="text-white text-sm">{title}</div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary">Play</Button>
          <Button size="sm">Download</Button>
        </div>
      </div>
    </div>
  );
}

export default VideoPreview;


