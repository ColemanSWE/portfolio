import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="lost gut">
      <div>
        <h1>404</h1>
        <p>This page dissolved. Or it never existed.</p>
        <Link className="btn" href="/">
          Back to the homepage
        </Link>
      </div>
    </main>
  );
}
