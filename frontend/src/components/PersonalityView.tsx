"use client";

import React, { useState } from 'react';
import { Save, Plus, Trash2, Edit3, Brain } from 'lucide-react';

const DEFAULT_PROFILES = [
  { id: 1, name: 'Professional', tone: 'Helpful, concise, serious',  samplesCount: 15, isDefault: true  },
  { id: 2, name: 'Friendly',     tone: 'Warm, empathetic, casual',   samplesCount: 42, isDefault: false },
  { id: 3, name: 'Flirty',       tone: 'Playful, charming, witty',   samplesCount: 8,  isDefault: false },
];

export default function PersonalityView() {
  const [profiles, setProfiles] = useState(DEFAULT_PROFILES);
  const [sample, setSample] = useState('');

  const makeDefault = (id: number) =>
    setProfiles((prev) => prev.map((p) => ({ ...p, isDefault: p.id === id })));

  const remove = (id: number) =>
    setProfiles((prev) => prev.filter((p) => p.id !== id));

  return (
    <>
      <header style={{ marginBottom: '32px' }}>
        <h1 className="gradient-text" style={{ fontSize: '30px', fontWeight: '700' }}>Personality Engine</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '6px', fontSize: '14px' }}>
          Train PAICA to speak exactly like you do across different contexts.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: '24px', alignItems: 'start' }}>
        {/* Profiles list */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Brain size={18} color="#8b5cf6" /> Tone Profiles
            </h2>
            <button id="new-profile-btn" className="primary-button" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', fontSize: '13px' }}>
              <Plus size={15} /> New Profile
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {profiles.map((profile) => (
              <div key={profile.id} className="card-glass" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: profile.isDefault ? '1px solid rgba(99,102,241,0.3)' : undefined }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '15px', fontWeight: '600' }}>{profile.name}</span>
                    {profile.isDefault && (
                      <span style={{ fontSize: '10px', background: '#6366f1', color: 'white', padding: '2px 8px', borderRadius: '20px', fontWeight: '700', textTransform: 'uppercase' }}>
                        Default
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>{profile.tone}</p>
                  <span style={{ fontSize: '12px', color: '#6366f1', fontWeight: '600' }}>{profile.samplesCount} training samples</span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {!profile.isDefault && (
                    <button id={`set-default-${profile.id}`} onClick={() => makeDefault(profile.id)} className="glass" style={{ padding: '8px 12px', borderRadius: '10px', cursor: 'pointer', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
                      Set Default
                    </button>
                  )}
                  <button id={`edit-profile-${profile.id}`} className="glass" style={{ padding: '9px', borderRadius: '10px', cursor: 'pointer', border: 'none' }}>
                    <Edit3 size={16} color="rgba(255,255,255,0.7)" />
                  </button>
                  {!profile.isDefault && (
                    <button id={`delete-profile-${profile.id}`} onClick={() => remove(profile.id)} className="glass" style={{ padding: '9px', borderRadius: '10px', cursor: 'pointer', border: 'none' }}>
                      <Trash2 size={16} color="#ef4444" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick training */}
        <aside className="card-glass" style={{ padding: '24px', borderRadius: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '12px' }}>Quick Training</h3>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '16px', lineHeight: '1.6' }}>
            Paste a few of your own past messages here for PAICA to analyze your tone.
          </p>
          <textarea
            id="training-textarea"
            value={sample}
            onChange={(e) => setSample(e.target.value)}
            rows={6}
            placeholder={"Example:\n\nHey, how are you? Let's catch up soon!\n\nSounds great, I'll ping you tomorrow morning."}
            style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px', color: 'white', fontSize: '13px', fontFamily: 'inherit', resize: 'vertical', outline: 'none', lineHeight: '1.6', marginBottom: '14px' }}
          />
          <button id="analyze-train-btn" className="primary-button" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px' }}>
            <Save size={14} /> Analyze & Train
          </button>
        </aside>
      </div>
    </>
  );
}
