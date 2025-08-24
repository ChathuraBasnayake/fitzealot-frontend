import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Plus, 
  ChevronDown, 
  Info,
  Smile,
  X, 
  TrendingUp,
  Droplets,
  Flame,
  Zap,
  Target,
  Trophy,
  MoreHorizontal,
  Star,
  ChevronRight
} from 'lucide-react';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userName] = useState('Thomas');
  const [showTips, setShowTips] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getMotivationalMessage = () => {
    const messages = [
      "You're crushing it today! 💪",
      "Keep up the amazing work! ⭐",
      "You're on fire! 🔥",
      "Almost there! Don't give up! 🚀",
      "You're doing great! 🌟"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto"></div>
            <div className="absolute -top-1 -right-1 text-2xl">✨</div>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Hey {userName}! 👋</h2>
          <p className="text-gray-600">Preparing your awesome dashboard...</p>
          <div className="mt-4 text-sm text-gray-500">Almost ready! 🚀</div>
        </div>
      </div>
    );
  }

  const MetricCard = ({ title, value, unit, icon: Icon, progress, goal, bgGradient, emoji, encouragement }) => (
    <div className={`group relative overflow-hidden rounded-3xl p-4 sm:p-6 text-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer ${bgGradient}`}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white"></div>
        <div className="absolute top-8 -left-4 w-12 h-12 rounded-full bg-white"></div>
        <div className="absolute bottom-4 right-8 w-6 h-6 rounded-full bg-white"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-colors">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base sm:text-lg">{title}</h3>
          </div>
          <div className="text-2xl">{emoji}</div>
        </div>
        
        <div className="mb-3">
          <span className="text-2xl sm:text-4xl font-bold">{value}</span>
          {unit && <span className="text-sm sm:text-lg font-semibold ml-1 opacity-80">{unit}</span>}
        </div>
        
        {goal && (
          <div className="mb-4">
            <p className="text-xs sm:text-sm opacity-90 mb-2">{Math.round(progress)}% of your goal</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-white/30 rounded-full h-2">
                <div 
                  className="h-2 bg-white rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>
              <span className="text-xs font-medium">{progress}%</span>
            </div>
          </div>
        )}

        {encouragement && (
          <div className="text-xs opacity-90 font-medium bg-white/20 rounded-lg px-2 py-1 inline-block">
            {encouragement}
          </div>
        )}
      </div>
    </div>
  );

  const QuickActionCard = ({ icon: Icon, title, subtitle, color, onClick }) => (
    <button 
      onClick={onClick}
      className={`w-full p-4 rounded-2xl text-left transition-all duration-200 hover:scale-105 transform ${color} text-white shadow-lg hover:shadow-xl group`}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="font-semibold text-sm">{title}</div>
          <div className="text-xs opacity-90">{subtitle}</div>
        </div>
        <ChevronRight className="w-4 h-4 ml-auto opacity-70 group-hover:opacity-100 transition-opacity" />
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <div className="min-h-screen transition-all duration-300">
        {/* Header */}
        <header className="sticky top-0 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 px-4 lg:px-8 py-4 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">              
              <div>
                <p className="text-gray-500 text-sm lg:text-base flex items-center gap-2">
                  {getGreeting()} <Smile className="w-4 h-4" />
                </p>
                <h1 className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Welcome Back, {userName}! 🎉
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">{getMotivationalMessage()}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button 
                className="hidden sm:flex bg-orange-500 text-white px-4 py-2 rounded-xl items-center gap-2 hover:bg-orange-600 transition-colors"
                onClick={() => setShowTips(!showTips)}
              >
                <Info className="w-4 h-4" />
                <span className="hidden lg:inline">Tips</span>
              </button>
              <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors relative shadow-sm border border-gray-200">
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </button>
              <button className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl flex items-center justify-center hover:shadow-lg transition-all text-white">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tips Banner */}
          {showTips && (
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Star className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-1">💡 Pro Tip</h3>
                  <p className="text-sm text-blue-800">Try to drink a glass of water every hour to stay hydrated and boost your energy levels!</p>
                </div>
                <button onClick={() => setShowTips(false)} className="text-blue-400 hover:text-blue-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </header>

        <div className="flex flex-col xl:flex-row gap-6 p-4 lg:p-8">
          {/* Main Dashboard Content */}
          <div className="flex-1 space-y-6 lg:space-y-8">
            {/* Quick Actions - Mobile Only */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:hidden">
              <QuickActionCard 
                icon={Plus} 
                title="Log Workout" 
                subtitle="Quick entry"
                color="bg-gradient-to-r from-green-400 to-green-600"
                onClick={() => {}}
              />
              <QuickActionCard 
                icon={Droplets} 
                title="Add Water" 
                subtitle="Stay hydrated"
                color="bg-gradient-to-r from-blue-400 to-blue-600"
                onClick={() => {}}
              />
              <QuickActionCard 
                icon={Target} 
                title="Set Goal" 
                subtitle="Stay motivated"
                color="bg-gradient-to-r from-purple-400 to-purple-600"
                onClick={() => {}}
              />
              <QuickActionCard 
                icon={Trophy} 
                title="Achievements" 
                subtitle="View progress"
                color="bg-gradient-to-r from-yellow-400 to-orange-500"
                onClick={() => {}}
              />
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
              <MetricCard
                title="Steps"
                value="8,432"
                unit="steps"
                icon={TrendingUp}
                progress={84}
                goal="10,000"
                bgGradient="bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600"
                emoji="👟"
                encouragement="So close to 10K! 🎯"
              />
              <MetricCard
                title="Water"
                value="6.2"
                unit="L"
                icon={Droplets}
                progress={78}
                goal="8L"
                bgGradient="bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600"
                emoji="💧"
                encouragement="Great hydration! 💪"
              />
              <MetricCard
                title="Calories"
                value="1,847"
                unit="cal"
                icon={Flame}
                progress={92}
                goal="2,000"
                bgGradient="bg-gradient-to-br from-orange-400 via-red-500 to-pink-600"
                emoji="🔥"
                encouragement="You're on fire! 🚀"
              />
              <MetricCard
                title="Active Time"
                value="45"
                unit="min"
                icon={Zap}
                progress={75}
                goal="60"
                bgGradient="bg-gradient-to-br from-purple-400 via-violet-500 to-purple-600"
                emoji="⚡"
                encouragement="Keep it up! ⭐"
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
              {/* Activity Chart */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">Weekly Progress 📈</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 hover:bg-gray-100 transition-colors cursor-pointer">
                      <span className="text-gray-600 text-sm">Weekly</span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                    <button className="p-2 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-orange-600" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-end justify-between h-40 sm:h-48 px-2 bg-gradient-to-t from-gray-50 to-transparent rounded-2xl p-4">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                      const heights = [30, 60, 40, 65, 85, 55, 35];
                      const isToday = index === 4;
                      const isWeekend = index >= 5;
                      return (
                        <div key={day} className="flex flex-col items-center gap-3 flex-1 group cursor-pointer">
                          <div className="relative">
                            {isToday && (
                              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                Today! 🎯
                              </div>
                            )}
                            <div 
                              className={`w-6 sm:w-8 rounded-xl transition-all duration-500 hover:opacity-80 ${
                                isToday 
                                  ? 'bg-gradient-to-t from-orange-400 to-orange-500 shadow-lg' 
                                  : isWeekend
                                    ? 'bg-gradient-to-t from-purple-300 to-purple-400'
                                    : 'bg-gradient-to-t from-gray-200 to-gray-300'
                              }`}
                              style={{ height: `${heights[index]}%` }}
                            ></div>
                          </div>
                          <span className={`text-xs font-medium ${isToday ? 'text-orange-600 font-bold' : 'text-gray-500'}`}>
                            {day}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-center">
                    <div className="text-sm text-gray-600 bg-gray-50 rounded-full px-4 py-2">
                      🏆 You're having an amazing week!
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Breakdown */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">Activity Breakdown 🎯</h2>
                  <button className="p-2 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors self-start sm:self-auto">
                    <MoreHorizontal className="w-4 h-4 text-orange-600" />
                  </button>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="50%" cy="50%" r="45%" stroke="#f3f4f6" strokeWidth="8" fill="transparent"/>
                      <circle cx="50%" cy="50%" r="45%" stroke="#14b8a6" strokeWidth="8" fill="transparent" 
                              strokeDasharray="283" strokeDashoffset="70" className="transition-all duration-1000"/>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-teal-600 text-sm font-bold">Total</div>
                      <div className="text-gray-800 text-xl font-bold">127h</div>
                      <div className="text-xs text-gray-500">this month</div>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4 w-full">
                    {[
                      { name: 'Cardio', time: '52h', color: 'bg-teal-500', percentage: 41, emoji: '🏃‍♂️' },
                      { name: 'Strength', time: '38h', color: 'bg-purple-500', percentage: 30, emoji: '💪' },
                      { name: 'Flexibility', time: '25h', color: 'bg-yellow-500', percentage: 20, emoji: '🧘‍♀️' },
                      { name: 'Sports', time: '12h', color: 'bg-pink-500', percentage: 9, emoji: '⚽' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                        <div className="text-lg">{item.emoji}</div>
                        <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                        <span className="flex-1 text-gray-700 font-medium">{item.name}</span>
                        <div className="text-right">
                          <div className="text-gray-800 text-sm font-bold">{item.time}</div>
                          <div className="text-gray-500 text-xs">{item.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full xl:w-96 space-y-6">
            {/* User Profile */}
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                    {userName.charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{userName} Fletcher</h3>
                  <p className="text-gray-500 text-sm flex items-center gap-1">
                    <span>📍</span> Sydney, Australia
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">Premium Member</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Weight', value: '75', unit: 'kg', color: 'text-blue-600' },
                  { label: 'Height', value: '185', unit: 'cm', color: 'text-green-600' },
                  { label: 'Age', value: '28', unit: 'y', color: 'text-purple-600' }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <div className="text-xl font-bold text-gray-800">
                      {stat.value}<span className={`text-sm ${stat.color} ml-1`}>{stat.unit}</span>
                    </div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Goals */}
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                Your Goals 🎯
              </h3>
              <div className="space-y-4">
                {[
                  { emoji: '🏃', title: 'Daily Run', progress: '7.2/10 km', percentage: 72 },
                  { emoji: '💪', title: 'Strength Training', progress: '3/4 sessions', percentage: 75 },
                  { emoji: '😴', title: 'Sleep Quality', progress: '7.5/8 hours', percentage: 94 }
                ].map((goal, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                      <div className="text-2xl">{goal.emoji}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 text-sm">{goal.title}</div>
                        <div className="text-gray-500 text-xs">{goal.progress}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm text-gray-800">{goal.percentage}%</div>
                        <div className="w-12 bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-gradient-to-r from-orange-400 to-orange-600 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${goal.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;