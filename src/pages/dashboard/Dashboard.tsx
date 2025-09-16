import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Settings as SettingsIcon } from 'lucide-react';
import { useAppStore } from '../../stores/appStore';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import VideoPreview from '../../components/dashboard/VideoPreview';
import QuickStats from '../../components/dashboard/QuickStats';

export function Dashboard() {
  const { connectedPlatforms, addPost } = useAppStore();
  const [prompt, setPrompt] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [publishType, setPublishType] = useState<'auto' | 'approval'>('approval');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState<{ title: string; previewUrl?: string } | null>(null);

  const platforms = [
    { id: 'youtube', name: 'YouTube Shorts', color: 'bg-red-500' },
    { id: 'instagram', name: 'Instagram Reels', color: 'bg-pink-500' },
    { id: 'tiktok', name: 'TikTok', color: 'bg-purple-500' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGenerated(null);
    
    addPost({
      title: prompt.substring(0, 50) + (prompt.length > 50 ? '...' : ''),
      prompt,
      status: 'generating',
      platforms: selectedPlatforms
    });

    setPrompt('');
    setSelectedPlatforms([]);
    
    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated({
        title: 'Generated preview',
      });
    }, 2200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  // Always render the prompt UI. If no platforms are connected, we show a helper card

  return (
    <div className="max-w-4xl mx-auto space-y-8 relative">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Dashboard</h1>
        <p className="text-text-secondary">Create your next viral video with AI</p>
      </div>

      {/* Video Generation Form */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-text-primary">Generate New Video</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Prompt Input */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Video Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe the video you want to create... (e.g., 'Create a motivational video about morning routines with upbeat music')"
              className="w-full px-4 py-3 border border-border rounded-lg shadow-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-background text-text-primary resize-none"
              rows={4}
            />
          </div>


          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Select Platforms
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {platforms.map((platform) => {
                const isConnected = connectedPlatforms.includes(platform.id);
                const isSelected = selectedPlatforms.includes(platform.id);
                
                return (
                  <button
                    key={platform.id}
                    onClick={() => {
                      if (!isConnected) return;
                      setSelectedPlatforms(prev =>
                        isSelected
                          ? prev.filter(p => p !== platform.id)
                          : [...prev, platform.id]
                      );
                    }}
                    disabled={!isConnected}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      !isConnected
                        ? 'border-border bg-surface-light opacity-50 cursor-not-allowed'
                        : isSelected
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-border hover:border-border-hover bg-background'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${platform.color}`} />
                      <span className="font-medium text-text-primary">
                        {platform.name}
                      </span>
                      {!isConnected && (
                        <span className="text-xs text-text-muted">(Not connected)</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Publishing Type */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Publishing Type
            </label>
            <div className="flex bg-surface-light rounded-lg p-1">
              <button
                onClick={() => setPublishType('approval')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  publishType === 'approval'
                    ? 'bg-background text-text-primary shadow-sm border border-border'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Publish with Approval
              </button>
              <button
                onClick={() => setPublishType('auto')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  publishType === 'auto'
                    ? 'bg-background text-text-primary shadow-sm border border-border'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Auto-Publish
              </button>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full"
            size="lg"
            icon={isGenerating ? undefined : Zap}
            isLoading={isGenerating}
          >
            {isGenerating ? 'Generating Video...' : 'Generate Video'}
          </Button>
        </CardContent>
      </Card>

      {connectedPlatforms.length === 0 && (
        <Card className="text-center">
          <CardContent className="py-10">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <SettingsIcon className="w-6 h-6 text-primary-600" />
            </div>
            <p className="text-text-secondary mb-4">To publish automatically, connect at least one platform in Settings.</p>
            <Link to="/dashboard/settings">
              <Button size="sm">Open Settings</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Generated Preview */}
      {generated && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-text-primary">Preview</h2>
          </CardHeader>
          <CardContent>
            <VideoPreview title={generated.title} />
          </CardContent>
        </Card>
      )}

      {/* Loading Overlay */}
      <LoadingOverlay
        show={isGenerating}
        message="Generating your video"
        subMessage="Synthesizing visuals, polishing voiceover, mixing soundtrack"
        fullscreen={false}
        className="rounded-xl"
      />

      {/* Quick Stats */}
      <QuickStats videosGenerated={24} thisMonth={12} connectedPlatforms={connectedPlatforms.length} />
    </div>
  );
}