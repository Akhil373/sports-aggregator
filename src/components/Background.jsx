export default function Background({ children }) {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background:
          "radial-gradient(50% 100% at 30% 200px, #eaeaea 0%, #fbe1da 100%)",
      }}
    >
      {children}
    </div>
  );
}
