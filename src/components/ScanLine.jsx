const noiseSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>`

export default function ScanLine() {
  return (
    <>
      <div
        className="animate-scan-line"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 50,
          width: '100%',
          height: '2px',
          background: 'rgba(0, 210, 255, 0.06)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          pointerEvents: 'none',
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,${noiseSvg}")`,
          backgroundSize: '128px 128px',
          backgroundRepeat: 'repeat',
        }}
      />
    </>
  )
}
