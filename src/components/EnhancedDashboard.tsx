import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { 
  MapPin, 
  Activity, 
  AlertTriangle,
  TrendingUp,
  Droplets,
  Thermometer,
  Mountain,
  Shield
} from 'lucide-react';

interface Mine {
  id: string;
  name: string;
  location: string;
  state: string;
  latitude: number;
  longitude: number;
  current_risk_level: string;
  current_risk_probability: number;
  last_updated: string;
  mine_type: string;
}

interface EnhancedDashboardProps {
  onTabChange?: (tab: string) => void;
}

// Mine information database
const mineInformation = {
  'Jharia Coalfield': {
    description: 'One of India\'s largest and oldest coalfields, located in the Dhanbad district of Jharkhand. Known for underground fires that have been burning for over a century, making it one of the most challenging mining environments in the world.',
    keyFeatures: [
      'Underground fires since 1916',
      'High geological instability',
      'Active subsidence areas',
      'Continuous monitoring required',
      'Major coal production hub'
    ],
    challenges: [
      'Underground fire management',
      'Land subsidence',
      'Air quality concerns',
      'Relocation of affected communities'
    ],
    production: 'Major coal producer for steel and power industries',
    established: 'Early 1900s'
  },
  'Talcher Coalfield': {
    description: 'Located in the Angul district of Odisha, this is one of the largest coalfields in India. It serves multiple power plants and industrial units with high-quality coal.',
    keyFeatures: [
      'Open cast and underground mining',
      'Serves multiple power plants',
      'High-quality coal reserves',
      'Modern mining infrastructure',
      'Environmental compliance focus'
    ],
    challenges: [
      'Seasonal risk variations',
      'Water management',
      'Dust control',
      'Rehabilitation programs'
    ],
    production: 'Critical for Odisha and neighboring states\' power generation',
    established: '1950s'
  },
  'Korba Coalfield': {
    description: 'Situated in Chhattisgarh, Korba is known as the power capital of India. The coalfield supports numerous thermal power plants and is crucial for the nation\'s energy security.',
    keyFeatures: [
      'Power hub of India',
      'Extensive opencast operations',
      'Steep slope mining',
      'Heavy rainfall region',
      'Advanced monitoring systems'
    ],
    challenges: [
      'Steep slope stability',
      'Monsoon-related risks',
      'High production pressure',
      'Environmental impact management'
    ],
    production: 'Essential for national power grid stability',
    established: '1960s'
  },
  'Raniganj Coalfield': {
    description: 'India\'s first coalfield, located in West Bengal. It has a long history of mining operations with well-established practices and relatively stable conditions.',
    keyFeatures: [
      'First coalfield in India',
      'Well-established practices',
      'Stable geological conditions',
      'Heritage mining site',
      'Lower risk profile'
    ],
    challenges: [
      'Aging infrastructure',
      'Water logging',
      'Maintenance requirements',
      'Sustainable mining practices'
    ],
    production: 'Historical significance with steady production',
    established: '1774 (First commercial coal mine in India)'
  },
  'Singrauli Coalfield': {
    description: 'Located in Madhya Pradesh, this coalfield is one of the largest in India and serves as a major energy hub with multiple super thermal power stations.',
    keyFeatures: [
      'Major energy hub',
      'Super thermal power stations',
      'Large-scale operations',
      'Seasonal risk management',
      'Community development focus'
    ],
    challenges: [
      'Monsoon season risks',
      'Slope stability during rains',
      'Large-scale operations management',
      'Environmental restoration'
    ],
    production: 'Critical for central India\'s power supply',
    established: '1980s'
  },
  'Bellary Iron Ore': {
    description: 'Located in Karnataka, Bellary is one of India\'s richest iron ore mining regions. The area has extensive opencast mining operations extracting high-grade hematite ore.',
    keyFeatures: [
      'Rich iron ore deposits',
      'High-grade hematite ore',
      'Extensive opencast mining',
      'Deep excavation pits',
      'Steel industry supplier'
    ],
    challenges: [
      'Deep pit stability',
      'Slope management',
      'Water table management',
      'Dust and air quality'
    ],
    production: 'Major supplier to Indian steel industry',
    established: 'Early 1900s'
  },
  'Bailadila Iron Ore': {
    description: 'Located in the Dantewada district of Chhattisgarh, Bailadila is one of the largest iron ore mining complexes in India, operating in challenging hilly terrain.',
    keyFeatures: [
      'Largest iron ore complex',
      'Hilly terrain operations',
      'Deep opencast pits',
      'Steep slope challenges',
      'High-quality ore production'
    ],
    challenges: [
      'Steep terrain risks',
      'Deep pit operations',
      'Monsoon challenges',
      'Remote location logistics'
    ],
    production: 'Critical for domestic and export markets',
    established: '1960s'
  },
  'Goa Iron Ore': {
    description: 'Located in the coastal state of Goa, these iron ore mines operate in relatively stable conditions with moderate slopes and well-managed mining practices.',
    keyFeatures: [
      'Coastal mining operations',
      'Moderate slope conditions',
      'Well-managed practices',
      'Environmental compliance',
      'Lower risk profile'
    ],
    challenges: [
      'Environmental regulations',
      'Coastal ecosystem protection',
      'Sustainable mining',
      'Community relations'
    ],
    production: 'Export-oriented with focus on quality',
    established: '1950s'
  }
};

const EnhancedDashboard = ({ onTabChange }: EnhancedDashboardProps) => {
  const [mines, setMines] = useState<Mine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMines();
  }, []);

  const fetchMines = async () => {
    try {
      const { data: minesData, error } = await supabase
        .from('mines')
        .select('*')
        .order('name');

      if (error) throw error;
      setMines(minesData || []);
    } catch (error) {
      console.error('Error fetching mines:', error);
      // Set default mines if database fails
      setMines([
        {
          id: '1',
          name: 'Jharia Coalfield',
          location: 'Dhanbad District',
          state: 'Jharkhand',
          latitude: 23.7,
          longitude: 86.4,
          current_risk_level: 'high',
          current_risk_probability: 0.85,
          last_updated: new Date().toISOString(),
          mine_type: 'coal'
        },
        {
          id: '2',
          name: 'Talcher Coalfield',
          location: 'Angul District',
          state: 'Odisha',
          latitude: 20.9,
          longitude: 85.2,
          current_risk_level: 'medium',
          current_risk_probability: 0.45,
          last_updated: new Date().toISOString(),
          mine_type: 'coal'
        },
        {
          id: '3',
          name: 'Korba Coalfield',
          location: 'Korba District',
          state: 'Chhattisgarh',
          latitude: 22.3,
          longitude: 82.7,
          current_risk_level: 'high',
          current_risk_probability: 0.78,
          last_updated: new Date().toISOString(),
          mine_type: 'coal'
        },
        {
          id: '4',
          name: 'Raniganj Coalfield',
          location: 'Bardhaman District',
          state: 'West Bengal',
          latitude: 23.6,
          longitude: 87.1,
          current_risk_level: 'low',
          current_risk_probability: 0.25,
          last_updated: new Date().toISOString(),
          mine_type: 'coal'
        },
        {
          id: '5',
          name: 'Singrauli Coalfield',
          location: 'Singrauli District',
          state: 'Madhya Pradesh',
          latitude: 24.2,
          longitude: 82.7,
          current_risk_level: 'medium',
          current_risk_probability: 0.52,
          last_updated: new Date().toISOString(),
          mine_type: 'coal'
        },
        {
          id: '6',
          name: 'Bellary Iron Ore',
          location: 'Bellary District',
          state: 'Karnataka',
          latitude: 15.1,
          longitude: 76.9,
          current_risk_level: 'medium',
          current_risk_probability: 0.48,
          last_updated: new Date().toISOString(),
          mine_type: 'iron'
        },
        {
          id: '7',
          name: 'Bailadila Iron Ore',
          location: 'Dantewada District',
          state: 'Chhattisgarh',
          latitude: 18.7,
          longitude: 81.3,
          current_risk_level: 'high',
          current_risk_probability: 0.82,
          last_updated: new Date().toISOString(),
          mine_type: 'iron'
        },
        {
          id: '8',
          name: 'Goa Iron Ore',
          location: 'Various Districts',
          state: 'Goa',
          latitude: 15.5,
          longitude: 74.0,
          current_risk_level: 'low',
          current_risk_probability: 0.22,
          last_updated: new Date().toISOString(),
          mine_type: 'iron'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'high':
        return <Badge variant="destructive" className="text-sm">High Risk</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="text-sm">Medium Risk</Badge>;
      case 'low':
        return <Badge variant="default" className="text-sm bg-green-500/20 text-green-600 border-green-500/30">Low Risk</Badge>;
      default:
        return <Badge variant="outline" className="text-sm">Unknown</Badge>;
    }
  };

  const getMineTypeIcon = (type: string) => {
    return type === 'coal' ? <Mountain className="w-5 h-5" /> : <Shield className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-monitoring-bg flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading mines information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-monitoring-bg text-foreground">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">SHAIL KAVACH</h1>
              <p className="text-sm text-muted-foreground">Mining Safety & Monitoring Platform</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Comprehensive information about all monitored mining locations across India
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 border-primary/20">
            <div className="flex items-center space-x-3">
              <Activity className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{mines.length}</p>
                <p className="text-sm text-muted-foreground">Total Mines</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-danger/20 to-danger/10 border-danger/20">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-8 h-8 text-danger" />
              <div>
                <p className="text-2xl font-bold text-danger">
                  {mines.filter(m => m.current_risk_level === 'high').length}
                </p>
                <p className="text-sm text-muted-foreground">High Risk</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-warning/20 to-warning/10 border-warning/20">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-warning" />
              <div>
                <p className="text-2xl font-bold text-warning">
                  {mines.filter(m => m.current_risk_level === 'medium').length}
                </p>
                <p className="text-sm text-muted-foreground">Medium Risk</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-green-500/20 to-green-500/10 border-green-500/20">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {mines.filter(m => m.current_risk_level === 'low').length}
                </p>
                <p className="text-sm text-muted-foreground">Low Risk</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Mines Sections */}
        <div className="space-y-8">
          {mines.map((mine) => {
            const info = mineInformation[mine.name as keyof typeof mineInformation] || {
              description: `Located in ${mine.location}, ${mine.state}. ${mine.mine_type === 'coal' ? 'Coal mining' : 'Iron ore mining'} operations.`,
              keyFeatures: ['Active mining operations', 'Continuous monitoring', 'Safety protocols'],
              challenges: ['Risk management', 'Environmental compliance'],
              production: 'Active production',
              established: 'Ongoing operations'
            };

            return (
              <Card key={mine.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      {getMineTypeIcon(mine.mine_type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h2 className="text-2xl font-bold">{mine.name}</h2>
                        {getRiskBadge(mine.current_risk_level)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{mine.location}, {mine.state}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Activity className="w-4 h-4" />
                          <span className="capitalize">{mine.mine_type} Mining</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>Risk: {Math.round(mine.current_risk_probability * 100)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-muted-foreground leading-relaxed">{info.description}</p>
                </div>

                {/* Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Key Features */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-primary" />
                      <span>Key Features</span>
                    </h3>
                    <ul className="space-y-2">
                      {info.keyFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-warning" />
                      <span>Challenges</span>
                    </h3>
                    <ul className="space-y-2">
                      {info.challenges.map((challenge, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm">
                          <span className="text-warning mt-1">•</span>
                          <span className="text-muted-foreground">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold mb-1">Production</p>
                    <p className="text-sm text-muted-foreground">{info.production}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">Established</p>
                    <p className="text-sm text-muted-foreground">{info.established}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
