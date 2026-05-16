import { Shield, CheckCircle, Star } from 'lucide-react';

interface TrustScoreProps {
  score: number;
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
}

export function TrustScore({ score, size = 'medium', showDetails = false }: TrustScoreProps) {
  const getColor = () => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 75) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getLabel = () => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Poor';
  };

  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-3 py-1.5',
    large: 'text-base px-4 py-2'
  };

  return (
    <div className="inline-flex flex-col gap-2">
      <div className={`inline-flex items-center gap-2 rounded-full border ${getColor()} ${sizeClasses[size]}`}>
        <Shield size={size === 'small' ? 14 : size === 'medium' ? 16 : 20} />
        <span className="font-semibold">Trust Score: {score}/100</span>
        {score >= 90 && <CheckCircle size={size === 'small' ? 14 : size === 'medium' ? 16 : 20} />}
      </div>
      
      {showDetails && (
        <div className="text-xs text-gray-600 flex items-center gap-1">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          <span>{getLabel()} Rating</span>
        </div>
      )}
    </div>
  );
}
