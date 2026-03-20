import { ImageResponse } from 'next/og';

export const alt = 'RenoNext — Your renovation shouldn\'t feel like a gamble';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';
export const dynamic = 'force-dynamic';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#102122',
          padding: '80px',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: 'white',
              fontFamily: 'serif',
              letterSpacing: '-0.02em',
            }}
          >
            RenoNext
          </div>
          <div
            style={{
              fontSize: 40,
              color: '#f6f8f8',
              textAlign: 'center',
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            Your renovation shouldn't feel like a gamble.
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: 'linear-gradient(90deg, #0fbabd 0%, #0D9FA1 100%)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
