# Audio Files for Pomodoro App

This folder contains all audio files for the Pomodoro timer application.

## Folder Structure

```
sounds/
├── notifications/     # Short alert sounds (1-3 seconds)
│   ├── timer-end.mp3
│   ├── break-start.mp3
│   ├── work-start.mp3
│   └── task-complete.mp3
├── background/        # Longer music files (2-5 minutes, will loop)
│   ├── focus-music.mp3
│   └── relax-music.mp3
└── ambient/           # Ambient sounds (will loop)
    ├── rain.mp3
    ├── nature.mp3
    └── cafe.mp3
```

## Audio Requirements

### Notification Sounds
- **Format**: MP3 or OGG
- **Duration**: 1-3 seconds
- **Volume**: Normalized to -12dB to -6dB
- **Purpose**: Alert users when timer events occur

### Background Music
- **Format**: MP3 or OGG
- **Duration**: 2-5 minutes (will loop)
- **Volume**: Normalized to -18dB to -12dB (quieter than notifications)
- **Purpose**: Provide focus or relaxation music

### Ambient Sounds
- **Format**: MP3 or OGG
- **Duration**: 30 seconds to 2 minutes (will loop)
- **Volume**: Normalized to -20dB to -16dB (very quiet)
- **Purpose**: Create ambient atmosphere

## Recommended Audio Sources

### Free Sources
1. **Freesound.org** - Community-contributed sounds
2. **Zapsplat.com** - Free sound effects and music
3. **Pixabay.com** - Free music and sound effects
4. **YouTube Audio Library** - Free music tracks
5. **ccMixter** - Creative Commons music

### Paid Sources
1. **AudioJungle** - Professional audio library
2. **PremiumBeat** - High-quality music and sounds
3. **Epidemic Sound** - Subscription-based music library

## Audio File Naming Convention

Use lowercase letters and hyphens:
- `timer-end.mp3`
- `focus-music.mp3`
- `rain.mp3`

## Adding Your Own Audio Files

1. Place your audio files in the appropriate folder
2. Use the exact filenames listed above
3. Ensure files are in MP3 or OGG format
4. Test the audio in the app's audio settings panel

## Audio Optimization Tips

1. **Compress audio files** to reduce file size
2. **Use MP3 format** for best browser compatibility
3. **Keep file sizes small** (under 1MB for notifications, under 5MB for music)
4. **Test on different devices** to ensure compatibility
5. **Provide fallback formats** if needed

## Browser Compatibility

- **MP3**: Supported by all modern browsers
- **OGG**: Good compression, supported by most browsers
- **WAV**: Uncompressed, larger files but universal support
- **M4A**: Good quality, smaller than MP3

## Example Audio Files

You can find example audio files from these sources:

### Notification Sounds
- Timer end: Short, clear bell or chime sound
- Break start: Gentle, uplifting sound
- Work start: Motivational, energetic sound
- Task complete: Satisfying completion sound

### Background Music
- Focus music: Instrumental, non-distracting, 80-120 BPM
- Relax music: Calm, peaceful, 60-80 BPM

### Ambient Sounds
- Rain: Gentle rain with thunder
- Nature: Forest sounds, birds, wind
- Cafe: Coffee shop ambience, soft chatter 