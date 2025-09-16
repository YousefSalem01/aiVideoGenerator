import { Card, CardContent } from '../ui/Card';
import { Play, Zap, Settings as SettingsIcon } from 'lucide-react';

interface QuickStatsProps {
  videosGenerated: number;
  thisMonth: number;
  connectedPlatforms: number;
}

export function QuickStats({ videosGenerated, thisMonth, connectedPlatforms }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Videos Generated</p>
              <p className="text-2xl font-bold text-text-primary">{videosGenerated}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Play className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">This Month</p>
              <p className="text-2xl font-bold text-text-primary">{thisMonth}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Connected Platforms</p>
              <p className="text-2xl font-bold text-text-primary">{connectedPlatforms}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default QuickStats;


