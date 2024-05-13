import Link from 'next/link';

export default function ErrorCard() {
  return (
    <div>
      <p className="text-center text-sm text-gray-600 mt-2">
        Back to&nbsp;
        <Link className="text-blue-500 hover:underline" href="/login">
          Login
        </Link>
      </p>
    </div>
  );
}
