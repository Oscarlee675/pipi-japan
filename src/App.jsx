import React, { useState, useEffect } from 'react';
import { 
  Calendar, MapPin, Clock, Info, CheckCircle, 
  ChevronDown, ChevronUp, Plane, Train, Bus, Coffee, 
  ShoppingBag, Camera, Utensils, Hotel, ExternalLink, Map,
  CircleDollarSign, Wallet, Ship, Edit3, Cloud, Sun, CloudRain, CloudLightning, Thermometer,
  Sparkles, Compass
} from 'lucide-react';

// 圖示對照表，確保渲染穩定
const ICON_MAP = {
  Plane: <Plane className="w-4 h-4"/>,
  Train: <Train className="w-4 h-4"/>,
  Bus: <Bus className="w-4 h-4"/>,
  Utensils: <Utensils className="w-4 h-4"/>,
  Hotel: <Hotel className="w-4 h-4"/>,
  Ship: <Ship className="w-4 h-4"/>,
  ShoppingBag: <ShoppingBag className="w-4 h-4"/>,
  MapPin: <MapPin className="w-4 h-4"/>,
  Camera: <Camera className="w-4 h-4"/>,
  Coffee: <Coffee className="w-4 h-4"/>
};

const INITIAL_DATA = [
  {
    day: 1,
    date: "3/17 (週二)",
    title: "東廣島",
    location: "廣島",
    area: "Hiroshima",
    activities: [
      { time: "10:30", icon: "Plane", task: "抵達廣島機場 (CI112)", mapLink: "https://www.google.com/maps/search/?api=1&query=Hiroshima+Airport" },
      { time: "12:00", icon: "Bus", task: "接駁巴士：西條空港線", note: "機場 ➔ JR 西條站", transport: "巴士", price: 700 },
      { time: "12:30", icon: "Utensils", task: "午餐：佛蘭斯美酒鍋/お好み燒 よし", mapLink: "https://www.google.com/maps/search/?api=1&query=佛蘭斯+西條", price: 1800 },
      { time: "16:00", icon: "Train", task: "JR 山陽本線：西條 ➔ 廣島", transport: "JR", price: 590 },
      { time: "19:00", icon: "Utensils", task: "晚餐：みっちゃん總本店 ekie店", mapLink: "https://maps.app.goo.gl/V17dPKq6PtGb8kfUA", price: 1500 },
      { time: "21:00", icon: "Hotel", task: "返回飯店休息", note: "APA 廣島站前新幹線口", transport: "電車/巴士", price: 220 }
    ]
  },
  {
    day: 2,
    date: "3/18 (週三)",
    title: "海上鳥居",
    location: "廣島",
    area: "Hiroshima",
    activities: [
      { time: "09:00", icon: "Train", task: "交通：JR 往宮島口", transport: "JR", price: 420 },
      { time: "10:00", icon: "Ship", task: "渡輪：宮島口 ➔ 宮島", transport: "船", price: 200 },
      { time: "12:30", icon: "Utensils", task: "午餐：商店街！", mapLink: "https://www.google.com/maps/search/?api=1&query=Anagomeshi+Ueno", price: 1500 },
      { time: "13:30", icon: "Utensils", task: "宮島水族館", mapLink: "https://maps.app.goo.gl/e72ntsjNmj5CbZTf7", price: 1420 },
      { time: "22:00", icon: "Bus", task: "夜間巴士往東京", note: "7-11 廣島松原町店前上車", transport: "巴士", mapLink: "https://maps.app.goo.gl/kTKCHQpRyXVnK59G8", price: 0 }
    ]
  },
  {
    day: 3,
    date: "3/19 (週四)",
    title: "抵達東京．淺草",
    location: "東京",
    area: "Tokyo",
    activities: [
      { time: "08:30", icon: "Bus", task: "抵達東京車站/新宿", note: "轉乘銀座線至田原町" },
      { time: "12:00", icon: "Utensils", task: "午餐：淺草炸牛排", mapLink: "https://www.google.com/maps/search/?api=1&query=Asakusa+Gyukatsu", isFood: true, price: 1700 },
      { time: "19:00", icon: "Utensils", task: "晚餐：宇奈とと鰻魚飯", mapLink: "https://www.google.com/maps/search/?api=1&query=Unatoto+Asakusa", isFood: true, price: 1100 },
      { time: "21:00", icon: "Hotel", task: "返回飯店休息", note: "APA 淺草田原町", transport: "地鐵", price: 200 }
    ]
  },
  {
    day: 4,
    date: "3/20 (週五)",
    title: "夢幻國度迪士尼",
    location: "千葉",
    area: "Tokyo",
    activities: [
      { time: "07:30", icon: "Train", task: "交通：淺草 ➔ 舞濱", transport: "地鐵+JR", price: 600 },
      { time: "09:00", icon: "MapPin", task: "東京迪士尼樂園門票", mapLink: "https://www.google.com/maps/search/?api=1&query=Tokyo+Disneyland", price: 0 },
      { time: "18:00", icon: "Utensils", task: "晚餐：美食街", price: 1500 },
      { time: "21:30", icon: "Hotel", task: "返回飯店休息", transport: "JR+地鐵", price: 600 }
    ]
  },
  {
    day: 5,
    date: "3/21 (週六)",
    title: "澀谷與原宿散策",
    location: "東京",
    area: "Tokyo",
    activities: [
      { time: "10:30", icon: "Train", task: "交通：銀座線直達澀谷", transport: "地鐵", price: 250 },
      { time: "12:00", icon: "Utensils", task: "午餐：九州炸裂拉麵", price: 1200 },
      { time: "19:00", icon: "Utensils", task: "晚餐：鳥貴族居酒屋", price: 3000 },
      { time: "21:30", icon: "Hotel", task: "返回飯店休息", transport: "地鐵", price: 250 }
    ]
  },
  {
    day: 6,
    date: "3/22 (週日)",
    title: "東京市區慢遊",
    location: "東京",
    area: "Tokyo",
    activities: [
      { time: "09:00", icon: "Utensils", task: "築地海鮮小吃",  price: 2000 },
      { time: "18:00", icon: "Utensils", task: "晚餐：山家炸豬排", mapLink: "https://www.google.com/maps/search/?api=1&query=Tonkatsu+Yamabe", isFood: true, price: 950 },
      { time: "20:30", icon: "Hotel", task: "返回飯店休息", transport: "地鐵", price: 200 }
    ]
  },
  {
    day: 7,
    date: "3/23 (週一)",
    title: "最後採購衝刺",
    location: "東京",
    area: "Tokyo",
    activities: [
      { time: "14:00", icon: "ShoppingBag", task: "採買行程", note: "合羽橋/秋葉原/銀座" },
      { time: "19:00", icon: "Utensils", task: "慶功宴：鍋藏壽喜燒", price: 4500 },
      { time: "21:30", icon: "Hotel", task: "返回飯店休息", transport: "地鐵", price: 200 }
    ]
  },
  {
    day: 8,
    date: "3/24 (週二)",
    title: "帶著回憶返台",
    location: "東京",
    area: "Tokyo",
    activities: [
      { time: "07:30", icon: "Train", task: "Skyliner 至機場", transport: "Skyliner", price: 2570 },
      { time: "09:30", icon: "Plane", task: "成田機場 Check-in" }
    ]
  }
];

const WeatherIcon = ({ code }) => {
  if (code === 0) return <Sun className="w-5 h-5 text-orange-400" />;
  if (code <= 3) return <Cloud className="w-5 h-5 text-slate-400" />;
  if (code <= 67) return <CloudRain className="w-5 h-5 text-blue-400" />;
  return <CloudLightning className="w-5 h-5 text-indigo-400" />;
};

const DayCard = ({ data, dayIdx, isOpen, onToggle, onPriceChange, weather }) => {
  const dayTotal = data.activities.reduce((sum, act) => sum + (Number(act.price) || 0), 0);

  return (
    <div className={`mb-6 transition-all duration-500 border rounded-[32px] overflow-hidden ${isOpen ? 'bg-white shadow-2xl shadow-indigo-100/50 border-indigo-100 translate-y-[-4px]' : 'bg-white/70 backdrop-blur-md border-slate-200 shadow-sm hover:shadow-md hover:bg-white hover:translate-y-[-2px]'}`}>
      <button 
        onClick={onToggle}
        className="w-full text-left p-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-5">
          <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${isOpen ? 'bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-200' : 'bg-slate-100 text-slate-500'}`}>
            <span className="text-[10px] font-bold uppercase tracking-tighter mb-0.5">Day</span>
            <span className="text-2xl font-black leading-none">{data.day < 10 ? `0${data.day}` : data.day}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full transition-colors ${isOpen ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-200/50 text-slate-500'}`}>{data.date}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-400">
                <MapPin className="w-3 h-3" />
                {data.location}
              </div>
              {weather && (
                <div className="flex items-center gap-1 bg-rose-50 px-2 py-0.5 rounded-full text-[10px] font-bold text-rose-500 ml-1">
                  <Thermometer className="w-2.5 h-2.5" />
                  {weather.temp}°C
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">{data.title}</h3>
          </div>
        </div>
        
        <div className="flex items-center gap-5">
          <div className="hidden sm:flex flex-col items-end mr-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">預算小計</span>
            <span className={`text-sm font-mono font-bold transition-colors ${isOpen ? 'text-indigo-600' : 'text-slate-700'}`}>¥{dayTotal.toLocaleString()}</span>
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-indigo-50 rotate-180' : 'bg-slate-50'}`}>
            <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-indigo-500' : 'text-slate-400'}`} />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="px-6 md:px-10 pb-10 pt-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-100 to-transparent mb-10"></div>
          <div className="space-y-10 relative">
            <div className="absolute left-[13.5px] top-3 bottom-6 w-[3px] bg-slate-100 rounded-full"></div>
            
            {data.activities.map((act, i) => (
              <div key={i} className="relative pl-12 group">
                <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full bg-white border-[3px] border-slate-100 flex items-center justify-center z-10 group-hover:border-indigo-400 group-hover:shadow-lg transition-all duration-300">
                  {/* 使用 ICON_MAP 來安全渲染圖示 */}
                  {React.cloneElement(ICON_MAP[act.icon] || <CircleDollarSign />, { className: "w-3 h-3 text-slate-400 group-hover:text-indigo-500" })}
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-3">
                      <div className="text-xs font-black font-mono text-indigo-400 tracking-widest bg-indigo-50/50 px-2 py-0.5 rounded-md">{act.time}</div>
                      <h4 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{act.task}</h4>
                      {act.transport && (
                        <span className="px-2 py-0.5 text-[9px] font-black bg-slate-100 text-slate-500 rounded border border-slate-200 uppercase tracking-tighter">
                          {act.transport}
                        </span>
                      )}
                    </div>
                    {act.note && <p className="text-sm text-slate-500 font-medium leading-relaxed">{act.note}</p>}
                    
                    {act.mapLink && (
                      <a href={act.mapLink} target="_blank" className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-indigo-500 hover:bg-indigo-600 hover:text-white transition-all w-fit bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
                        <Map className="w-3 h-3" /> 開啟地圖導航
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <div className="relative flex items-center group/input">
                      <span className="absolute left-3.5 text-slate-400 text-[10px] font-black">¥</span>
                      <input 
                        type="number"
                        value={act.price || ''}
                        onChange={(e) => onPriceChange(dayIdx, i, e.target.value)}
                        placeholder="0"
                        className="w-28 pl-7 pr-4 py-2 text-xs font-mono font-bold text-slate-700 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all"
                      />
                      <Edit3 className="absolute right-[-24px] w-3 h-3 text-slate-300 opacity-0 group-hover/input:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>

                {act.isFood && (
                  <div className="mt-4 p-4 rounded-3xl bg-gradient-to-br from-rose-50 to-orange-50/30 border border-rose-100/50 flex gap-3 items-center ml-2 shadow-sm">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <Utensils className="w-4 h-4 text-rose-400" />
                    </div>
                    <span className="text-xs text-rose-700 font-bold tracking-tight">美食推薦：此行程包含在地高 CP 值餐飲建議</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-[32px] bg-gradient-to-r from-indigo-600 to-blue-600 text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl shadow-indigo-200/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Daily Total Budget</span>
                <h4 className="text-lg font-bold leading-none">今日預算小計</h4>
              </div>
            </div>
            <div className="text-4xl font-black font-mono tracking-tighter">
              <span className="text-xl mr-1 font-light opacity-60">¥</span>{dayTotal.toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [itinerary, setItinerary] = useState(INITIAL_DATA);
  const [openDays, setOpenDays] = useState([0]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [weatherData, setWeatherData] = useState({ Tokyo: null, Hiroshima: null });

  const fetchWeather = async () => {
    try {
      const cities = [
        { name: 'Tokyo', lat: 35.6895, lon: 139.6917 },
        { name: 'Hiroshima', lat: 34.3852, lon: 132.4553 }
      ];

      const results = {};
      for (const city of cities) {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`);
        const data = await response.json();
        results[city.name] = {
          temp: Math.round(data.current_weather.temperature),
          code: data.current_weather.weathercode
        };
      }
      setWeatherData(results);
    } catch (error) {
      console.error("Failed to fetch weather", error);
    }
  };

  useEffect(() => {
    fetchWeather();
    const timer = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const total = itinerary.reduce((acc, day) => {
      return acc + day.activities.reduce((sum, act) => sum + (Number(act.price) || 0), 0);
    }, 0);
    setTotalBudget(total);
  }, [itinerary]);

  const handlePriceChange = (dayIdx, activityIdx, newPrice) => {
    const updatedItinerary = [...itinerary];
    updatedItinerary[dayIdx].activities[activityIdx].price = newPrice === '' ? 0 : Number(newPrice);
    setItinerary(updatedItinerary);
  };

  const toggleDay = (idx) => {
    setOpenDays(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const jumpToDay = (idx) => {
    if (!openDays.includes(idx)) setOpenDays(prev => [...prev, idx]);
    setTimeout(() => {
      document.getElementById(`day-${idx}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-slate-900 font-sans selection:bg-indigo-100">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[50%] bg-indigo-100/30 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-5%] right-[-10%] w-[60%] h-[50%] bg-rose-100/20 blur-[150px] rounded-full"></div>
      </div>

      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 leading-tight">日本跳島指南</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Spring 2026</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">預算累計</span>
              <span className="text-xl font-black text-indigo-600 font-mono">¥{totalBudget.toLocaleString()}</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>
            <div className="flex gap-1.5 overflow-x-auto max-w-[200px] md:max-w-none scrollbar-hide">
              {itinerary.map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => jumpToDay(idx)}
                  className={`flex-shrink-0 w-8 h-8 rounded-lg text-[11px] font-black transition-all ${
                    openDays.includes(idx) ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {day.day}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        <header className="mb-16 text-center">
          <h1 className="text-6xl font-black tracking-tighter mb-6 text-slate-900 bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600">
            廣島 <span className="text-indigo-600">➔</span> 東京
          </h1>
        </header>

        <div className="grid grid-cols-2 gap-4 mb-16">
          {['Hiroshima', 'Tokyo'].map(city => (
            <div key={city} className="bg-white/60 backdrop-blur-md border border-slate-200/60 p-5 rounded-[28px] flex items-center justify-between shadow-sm group hover:shadow-lg transition-all duration-500">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{city} Now</span>
                <span className="font-bold text-slate-700">{city === 'Hiroshima' ? '廣島．西條' : '東京．淺草'}</span>
              </div>
              <div className="flex items-center gap-3">
                <WeatherIcon code={weatherData[city]?.code} />
                <span className="text-3xl font-black text-slate-900 font-mono tracking-tighter">{weatherData[city]?.temp ?? '--'}°</span>
              </div>
            </div>
          ))}
        </div>

        <section className="space-y-6">
          {itinerary.map((day, idx) => (
            <div id={`day-${idx}`} key={idx} className="scroll-mt-28">
              <DayCard 
                data={day} 
                dayIdx={idx}
                isOpen={openDays.includes(idx)} 
                onToggle={() => toggleDay(idx)} 
                onPriceChange={handlePriceChange}
                weather={weatherData[day.area]}
              />
            </div>
          ))}
        </section>

        <section className="mt-24 p-10 rounded-[48px] bg-slate-900 text-white shadow-3xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight">行前最後確認</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ChecklistItem text="護照與電子機票" />
              <ChecklistItem text="Suica/Pasmo 餘額" />
              <ChecklistItem text="網卡設定完成" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

const ChecklistItem = ({ text }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div 
      className={`flex items-center gap-4 p-4 transition-all duration-300 cursor-pointer rounded-3xl border ${checked ? 'bg-white/5 border-white/10 opacity-40' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}
      onClick={() => setChecked(!checked)}
    >
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${checked ? 'bg-indigo-500 border-indigo-500' : 'border-slate-600'}`}>
        {checked && <CheckCircle className="w-4 h-4 text-white" />}
      </div>
      <span className="text-slate-200 text-sm font-bold tracking-tight">{text}</span>
    </div>
  );
};