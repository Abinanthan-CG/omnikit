import React, { useState } from 'react';
import { ToolShell } from '../../components/ToolShell';
import { calculateSunTimes } from '../../engines/video/sunTools';

export const SunView: React.FC = () => {
  const [lat, setLat] = useState(37.7749);
  const [lng, setLng] = useState(-122.4194);
  const [cityName, setCityName] = useState('San Francisco, CA');

  const res = calculateSunTimes(lat, lng);

  const CITIES = [
    { name: 'San Francisco, CA', lat: 37.7749, lng: -122.4194 },
    { name: 'New York, NY', lat: 40.7128, lng: -74.006 },
    { name: 'London, UK', lat: 51.5074, lng: -0.1278 },
    { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503 },
    { name: 'Sydney, Australia', lat: -33.8688, lng: 151.2093 },
  ];

  const pickCity = (c: typeof CITIES[0]) => {
    setCityName(c.name);
    setLat(c.lat);
    setLng(c.lng);
  };

  const useCurrentLocation = () => {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLat(Math.round(pos.coords.latitude * 1000) / 1000);
        setLng(Math.round(pos.coords.longitude * 1000) / 1000);
        setCityName('My Location');
      });
    }
  };

  return (
    <ToolShell
      title="Golden Hour & Blue Hour Sun Calculator"
      category="video"
      description="Calculate morning and evening Golden Hour, Blue Hour, and solar noon for outdoor photography shoots."
      icon="🌅"
      onReset={() => {
        pickCity(CITIES[0]);
      }}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {CITIES.map((c) => (
              <button
                key={c.name}
                onClick={() => pickCity(c)}
                className={`px-3 py-1.5 text-xs rounded-lg font-mono border transition-all ${
                  cityName === c.name
                    ? 'bg-neutral-800 border-neutral-600 text-emerald-400 font-bold'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {c.name.split(',')[0]}
              </button>
            ))}
          </div>
          <button
            onClick={useCurrentLocation}
            className="text-xs text-neutral-400 hover:text-neutral-200 font-mono"
          >
            📍 Use My Geolocation
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Latitude</label>
            <input
              type="number"
              step="0.001"
              value={lat}
              onChange={(e) => {
                setLat(parseFloat(e.target.value) || 0);
                setCityName('Custom Coordinates');
              }}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 mb-1">Longitude</label>
            <input
              type="number"
              step="0.001"
              value={lng}
              onChange={(e) => {
                setLng(parseFloat(e.target.value) || 0);
                setCityName('Custom Coordinates');
              }}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-sm text-neutral-100 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-amber-950/20 border border-amber-800/40 rounded-xl">
            <span className="text-xs font-mono text-amber-500 font-semibold">Morning Golden Hour</span>
            <div className="text-xl font-bold font-mono text-amber-400 mt-2">
              {res.morningGoldenHour}
            </div>
            <div className="text-[11px] text-neutral-400 mt-1">Soft warm directional dawn light</div>
          </div>

          <div className="p-4 bg-amber-950/20 border border-amber-800/40 rounded-xl">
            <span className="text-xs font-mono text-amber-500 font-semibold">Evening Golden Hour</span>
            <div className="text-xl font-bold font-mono text-amber-400 mt-2">
              {res.eveningGoldenHour}
            </div>
            <div className="text-[11px] text-neutral-400 mt-1">Warm magic cinematic glow</div>
          </div>

          <div className="p-4 bg-sky-950/20 border border-sky-800/40 rounded-xl">
            <span className="text-xs font-mono text-sky-400 font-semibold">Evening Blue Hour</span>
            <div className="text-xl font-bold font-mono text-sky-300 mt-2">
              {res.eveningBlueHour}
            </div>
            <div className="text-[11px] text-neutral-400 mt-1">Deep indigo sky & city lights</div>
          </div>

          <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl">
            <span className="text-xs font-mono text-neutral-500">Daylight Length</span>
            <div className="text-xl font-bold font-mono text-neutral-200 mt-2">
              {res.dayLengthHours} hrs
            </div>
            <div className="text-[11px] text-neutral-400 mt-1">
              Sunrise {res.sunrise} • Sunset {res.sunset}
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
};
